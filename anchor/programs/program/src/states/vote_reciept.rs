use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct VoteReciept {
    pub voter: Pubkey,
    pub campaign: Pubkey,
    pub milestone_index: u8,
    pub is_agreed: bool,
    pub vote_receipt_bump: u8,
}