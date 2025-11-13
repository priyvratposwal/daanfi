use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct GovernanceConfig {
    pub is_graduated: bool,
    pub graduated_at: i64,
    pub treasury_bump: u8,
    pub config_bump: u8,
}

