use anchor_lang::prelude::*;

use crate::constants;
use crate::errors::ErrorCode;
use crate::states::{Campaign, GovernanceConfig, Status, UserProfile, VoteReciept};

#[derive(Accounts)]
#[instruction(milestone_index: u8)]
pub struct RecordVote<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,

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
        seeds = [b"user_profile", config.key().as_ref(), voter.key().as_ref()],
        bump = user_profile.user_profile_bump,
    )]
    pub user_profile: Account<'info, UserProfile>,

    #[account(
        init,
        payer = voter,
        space = VoteReciept::DISCRIMINATOR.len() + VoteReciept::INIT_SPACE,
        seeds = [b"vote_reciept", config.key().as_ref(), voter.key().as_ref(),campaign.key().as_ref(),&milestone_index.to_le_bytes()],
        bump,
    )]
    pub vote_reciept: Account<'info, VoteReciept>,

    pub system_program: Program<'info, System>,
}

pub fn record_vote(
    context: Context<RecordVote>,
    milestone_index: u8,
    is_agreed: bool,
) -> Result<()> {
    let milestone = &mut context.accounts.campaign.milestones[milestone_index as usize];
    require!(
        milestone.status == Status::Ongoing,
        ErrorCode::InvalidMilestoneStatus
    );

    let user_profile = &mut context.accounts.user_profile;
    // require!(
    //     user_profile.reputation_score >= constants::MIN_REPUTATION_SCORE_FOR_VOTING,
    //     ErrorCode::InvalidReputationScore
    // );

    let campaign = &mut context.accounts.campaign;

    let mi = milestone_index as usize;
    require!(mi < campaign.milestones.len(), ErrorCode::InvalidMilestoneIndex);

    campaign.milestones[mi].total_votes =
        campaign.milestones[mi].total_votes.checked_add(1).ok_or(ErrorCode::InvalidTotalVotes)?;


    if is_agreed {
        campaign.milestones[milestone_index as usize].total_agreed_votes = campaign.milestones[milestone_index as usize].total_agreed_votes.checked_add(1).ok_or(ErrorCode::InvalidTotalAgreedVotes)?;
    } else {
        campaign.milestones[milestone_index as usize].total_disagreed_votes = campaign.milestones[milestone_index as usize].total_disagreed_votes.checked_add(1).ok_or(ErrorCode::InvalidTotalDisagreedVotes)?;
    }
    

    user_profile.reputation_score = user_profile
        .reputation_score
        .checked_add(constants::VOTE_PARTICIPATION_REPUTATION_SCORE)
        .ok_or(ErrorCode::InvalidReputationScore)?;

    let vote_reciept = &mut context.accounts.vote_reciept;

    vote_reciept.set_inner(VoteReciept {
        voter: context.accounts.voter.key(),
        campaign: context.accounts.campaign.key(),
        milestone_index: milestone_index,
        is_agreed,
        vote_receipt_bump: context.bumps.vote_reciept,
    });

    Ok(())
}
