use anchor_lang::{prelude::*, system_program:: {Transfer, transfer}};
use crate::states::{Campaign, GovernanceConfig, Status};
use crate::errors::ErrorCode;
use crate::constants;
#[derive(Accounts)]
pub struct CompleteMilestone<'info> {
    #[account(mut)]
    pub sponsor: Signer<'info>,
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.config_bump,
    )]
    pub config: Account<'info, GovernanceConfig>,
    #[account(
        mut,
        seeds = [b"campaign", config.key().as_ref(), campaign.sponsor.as_ref(),&campaign.id.to_le_bytes()],
        bump = campaign.campaign_bump,
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        seeds = [b"treasury", config.key().as_ref()],
        bump = config.treasury_bump,
    )]
    pub treasury: SystemAccount<'info>,

    /// CHECK: This account is only receiving SOL via CPI and its validity (matching the campaign's beneficiary key) 
    /// is verified explicitly in the instruction logic below.
    #[account(mut)] 
    pub beneficiary: UncheckedAccount<'info>,

   pub system_program: Program<'info, System>,

    
    
}

pub fn complete_milestone(context: Context<CompleteMilestone>, milestone_index: u8) -> Result<()> {
    require!(context.accounts.sponsor.key() == context.accounts.campaign.sponsor, ErrorCode::InvalidSponsor);
    require!(context.accounts.campaign.milestones[milestone_index as usize].status == Status::Ongoing, ErrorCode::MilestoneNotPending);

    
    {
        
        let current_milestone = &mut context.accounts.campaign.milestones[milestone_index as usize];

        
        require!(current_milestone.total_votes >= constants::MINIMUM_VOTING_THRESHOLD, ErrorCode::NotEnoughVotes);
        current_milestone.status = Status::Completed;
        
    } 

    let current_milestone = &mut context.accounts.campaign.milestones[milestone_index as usize];
    let threshold = current_milestone.total_votes.checked_div(2).ok_or(ErrorCode::MilestoneThresholdCalculationError)?;
    require!(current_milestone.total_agreed_votes >= threshold, ErrorCode::NotAboveThreshold);

    
    let amount_to_transfer = context.accounts.campaign.milestones[milestone_index as usize].amount;
    let beneficiary_key = context.accounts.campaign.beneficiary.key(); 

    require!(context.accounts.beneficiary.key() == beneficiary_key, ErrorCode::InvalidBeneficiary);

    
    let cpi_program = context.accounts.system_program.to_account_info();

    let cpi_accounts = Transfer {
        from: context.accounts.treasury.to_account_info(),
        to: context.accounts.beneficiary.to_account_info(),
    };
    
    
    let config_key_ref = context.accounts.config.key(); 

    let treasury_seeds: &[&[u8]] = &[
        b"treasury",
        config_key_ref.as_ref(), 
        &[context.accounts.config.treasury_bump],
    ];

    let signers_seeds = &[
        treasury_seeds,
    ];

    let cpi_context = CpiContext::new_with_signer(cpi_program, cpi_accounts, signers_seeds);
    
    transfer(cpi_context, amount_to_transfer)?;

    context.accounts.campaign.milestones[milestone_index as usize].status = Status::Completed;
    context.accounts.campaign.total_milestones_completed = context.accounts.campaign.total_milestones_completed + 1;

    {
        if milestone_index == context.accounts.campaign.milestones.len() as u8 - 1 {
            context.accounts.campaign.status = Status::Completed;
        }
        else{
            let next = context.accounts.campaign.total_milestones_completed as usize;
    if let Some(next_milestone) = context.accounts.campaign.milestones.get_mut(next) {
        next_milestone.status = Status::Ongoing;
    }
        }
        
    } 
    
    Ok(())
}