use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    InvalidMilestoneAmount,
    InvalidTotalAmount,
    InvalidDonationAmount,
    InvalidTotalVotes,
    InvalidTotalAgreedVotes,
    InvalidTotalDisagreedVotes,
    InvalidMilestoneStatus,
    InvalidReputationScore,
    InvalidSponsor,
    NotAboveThreshold,
    InvalidBeneficiary,
    MilestoneThresholdCalculationError,
    NotEnoughVotes,
    InvalidMilestoneIndex,
    MilestoneNotPending
}