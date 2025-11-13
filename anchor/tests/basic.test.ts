import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Basic } from '../target/types/basic'
import { BN } from 'bn.js'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

describe('Daanfi Program Tests', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const connection = provider.connection
  const program = anchor.workspace.Basic as Program<Basic>

  // PDAs
  const config = PublicKey.findProgramAddressSync(
    [Buffer.from('config')],
    program.programId
  )[0]

  const treasury = PublicKey.findProgramAddressSync(
    [Buffer.from('treasury'), config.toBuffer()],
    program.programId
  )[0]

  const getCampaignPDA = (sponsor: PublicKey) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), config.toBuffer(), sponsor.toBuffer()],
      program.programId
    )[0]
  }

  const getUserProfilePDA = (user: PublicKey) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('user_profile'), config.toBuffer(), user.toBuffer()],
      program.programId
    )[0]
  }

  // Clean up after all tests
  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  it('should initialize the program', async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        payer: provider.wallet.publicKey,
      })
      .rpc()
    console.log('Initialize transaction:', tx)

    const configData = await program.account.governanceConfig.fetch(config)
    console.log('Config initialized:', {
      isGraduated: configData.isGraduated,
      graduatedAt: configData.graduatedAt.toNumber(),
      treasuryBump: configData.treasuryBump,
      configBump: configData.configBump
    })
  })

  it('should create a campaign', async () => {
    const campaign = getCampaignPDA(provider.wallet.publicKey)
    const id = new BN(1)
    const totalAmount = new BN(6000)
    const milestones = [
      { id: new BN(1), amount: new BN(2000), order: 1, isCompleted: false, completedAt: new BN(0) },
      { id: new BN(2), amount: new BN(2000), order: 2, isCompleted: false, completedAt: new BN(0) },
      { id: new BN(3), amount: new BN(2000), order: 3, isCompleted: false, completedAt: new BN(0) },
    ]

    const tx = await program.methods
      .createCampaign(id, totalAmount, milestones)
      .accounts({
        sponsor: provider.wallet.publicKey,
      })
      .rpc()
    console.log('Create campaign transaction:', tx)

    const campaignData = await program.account.campaign.fetch(campaign)
    console.log('Campaign created:', {
      id: campaignData.id.toNumber(),
      sponsor: campaignData.sponsor.toString(),
      totalAmount: campaignData.totalAmount.toNumber(),
      milestones: campaignData.milestones.length
    })
  })

  it('should accept a donation', async () => {
    const userProfile = getUserProfilePDA(provider.wallet.publicKey)
    const donationAmount = new BN(LAMPORTS_PER_SOL * 0.5) // 0.5 SOL

    const tx = await program.methods
      .donate(donationAmount)
      .accounts({
        donor: provider.wallet.publicKey,
      })
      .rpc()
    console.log('Donation transaction:', tx)

    const userProfileData = await program.account.userProfile.fetch(userProfile)
    const treasuryBalance = await connection.getBalance(treasury)
    
    console.log('Donation successful:', {
      donor: userProfileData.id.toString(),
      totalDonated: userProfileData.totalDonatedU64.toNumber(),
      treasuryBalance: treasuryBalance
    })
  })

  it('should handle complete workflow', async () => {
    const sponsor = anchor.web3.Keypair.generate()
    const donor = anchor.web3.Keypair.generate()

    // Airdrop to sponsor and donor
    const airdropTx1 = await connection.requestAirdrop(sponsor.publicKey, LAMPORTS_PER_SOL * 2)
    const airdropTx2 = await connection.requestAirdrop(donor.publicKey, LAMPORTS_PER_SOL * 2)
    
    const latestBlockhash = await connection.getLatestBlockhash()
    await Promise.all([
      connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: airdropTx1,
      }),
      connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: airdropTx2,
      }),
    ])

    // Create campaign
    const campaign = getCampaignPDA(sponsor.publicKey)
    const campaignId = new BN(100)
    const totalAmount = new BN(5000)
    const milestones = [
      { id: new BN(1), amount: new BN(2500), order: 1, isCompleted: false, completedAt: new BN(0) },
      { id: new BN(2), amount: new BN(2500), order: 2, isCompleted: false, completedAt: new BN(0) },
    ]

    await program.methods
      .createCampaign(campaignId, totalAmount, milestones)
      .accounts({
        sponsor: sponsor.publicKey,
      })
      .signers([sponsor])
      .rpc()

    // Donate
    const donorProfile = getUserProfilePDA(donor.publicKey)
    const donationAmount = new BN(LAMPORTS_PER_SOL)

    await program.methods
      .donate(donationAmount)
      .accounts({
        donor: donor.publicKey,
      })
      .signers([donor])
      .rpc()

    // Verify
    const campaignData = await program.account.campaign.fetch(campaign)
    const donorProfileData = await program.account.userProfile.fetch(donorProfile)

    console.log('Complete workflow executed:', {
      campaignId: campaignData.id.toNumber(),
      sponsor: campaignData.sponsor.toString().slice(0, 8) + '...',
      donor: donorProfileData.id.toString().slice(0, 8) + '...',
      totalDonated: donorProfileData.totalDonatedU64.toNumber()
    })
  })
})
