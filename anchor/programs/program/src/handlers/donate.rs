use anchor_lang::{prelude::*, system_program:: {Transfer, transfer}};

use crate::states::{GovernanceConfig, UserProfile};
use crate::errors::ErrorCode;


#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub donor: Signer<'info>,
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.config_bump,
    )]
    pub config: Account<'info, GovernanceConfig>,
    #[account(
        init_if_needed,
        payer = donor,
        space = UserProfile::DISCRIMINATOR.len() + UserProfile::INIT_SPACE,
        seeds = [b"user_profile", config.key().as_ref(), donor.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    
    #[account(
        mut,
        seeds = [b"treasury", config.key().as_ref()],
        bump = config.treasury_bump,
    )]
    pub treasury: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

pub fn donate(context: Context<Donate>, amount: u64) -> Result<()> {
    require!(amount > 0, ErrorCode::InvalidDonationAmount);
    let cpi_program = context.accounts.system_program.to_account_info();
    let cpi_accounts = Transfer {
        from: context.accounts.donor.to_account_info(),
        to: context.accounts.treasury.to_account_info(),
    };
    let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
    transfer(cpi_context, amount)?;

    let total_donated_amount = context.accounts.user_profile.total_donated_u64.checked_add(amount).ok_or(ErrorCode::InvalidDonationAmount)?;
    let last_donation_amount = context.accounts.user_profile.last_donation_amount.checked_add(amount).ok_or(ErrorCode::InvalidDonationAmount)?;
    context.accounts.user_profile.set_inner(UserProfile {
        id: context.accounts.donor.key(),
        authority: context.accounts.donor.key(),
        total_donated_u64: total_donated_amount,
        last_donation_amount: last_donation_amount,
        reputation_score: 0,
        user_profile_bump: context.bumps.user_profile,
    });
    Ok(())
}

