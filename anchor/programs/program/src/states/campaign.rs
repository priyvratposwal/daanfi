use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct Campaign {
    pub id: u64,
    pub sponsor: Pubkey,
    #[max_len(32)]
    pub title: String,
    #[max_len(256)]
    pub description: String,
    pub total_amount: u64,
    pub beneficiary: Pubkey,
    #[max_len(10)] // max 10 milestones
    pub milestones: Vec<Milestone>,
    pub status: Status,
    pub total_milestones_completed: u8,
    pub created_at: i64,
    pub updated_at: i64,
    pub campaign_bump: u8,
        
}

#[derive(AnchorDeserialize, AnchorSerialize,Clone,InitSpace)]
pub struct Milestone {
    pub id: u64,
    pub amount: u64,
    pub order: u8, // order of the milestone
    pub total_votes: u64,
    pub total_agreed_votes: u64,
    pub total_disagreed_votes: u64,
    pub status: Status,
}

#[derive(AnchorDeserialize, AnchorSerialize,Clone,InitSpace,PartialEq)]
pub enum Status {
    Pending = 0,
    Ongoing = 1,
    Completed = 2,
    Cancelled = 3,
}
