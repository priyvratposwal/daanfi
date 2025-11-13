use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct Escrow {
    pub id: u64,
    pub campaign: Pubkey,
    pub milestone_index: u8,
    pub amount: u64,
    pub escrow_bump: u8,
}