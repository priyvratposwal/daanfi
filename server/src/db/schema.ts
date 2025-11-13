import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true , unique: true, trim: true},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
});

const TransactionSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ['in', 'out'], required: true },
    transactionSignature: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});


const NonceSchema = new mongoose.Schema({
    // The wallet address requesting the authentication challenge
    publicKey: {
        type: String,
        required: true,
        unique: true,
    },
    // The unique, cryptographically secure message the user must sign
    nonce: {
        type: String,
        required: true,
    },
    // Standard creation time
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Index to automatically delete the document after a short period (e.g., 5 minutes)
    expiresAt: {
        type: Date,
        required: true,
        // Set expiry to 5 minutes from creation
        default: () => new Date(Date.now() + 5 * 60 * 1000), 
        index: { expires: '5m' }, // MongoDB TTL Index to auto-delete after 5 minutes
    },
});

export const User = mongoose.model('User', UserSchema);
export const Transaction = mongoose.model('Transaction', TransactionSchema);
export const Nonce = mongoose.model('Nonce', NonceSchema);