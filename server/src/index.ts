import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nacl from 'tweetnacl'; 
import bs58 from 'bs58';
import Razorpay from "razorpay"

import { User, Nonce, Transaction } from './db/schema';
import { requireAuth } from './middlewares/middleware';

const NONCE_TTL_MS = 5 * 60 * 1000;

const app = express();
app.use(cors());
app.use(express.json());




dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});



const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET || 'daanfi_secret_key';
try {
    await mongoose.connect(DATABASE_URL!);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to MongoDB', err);
}


app.post("/process/payment", async (req, res) => {
  try {
    const { amount, currency = "INR", walletAddress } = req.body;

    if (!amount || isNaN(Number(amount))) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency,
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);
    // Optionally: attach the walletAddress to order metadata on your side (DB) if you want to link later
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ success: false, message: "Error creating order" });
  }
});

/**
 * Verify payment signature, record transaction, and trigger on-chain action
 * Expects: razorpay_order_id, razorpay_payment_id, razorpay_signature
 * Optionally: walletAddress, amount (for recording & minting)
 */
app.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      walletAddress,
      amount,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay fields" });
    }

    // Create expected HMAC signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET!)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Save transaction in DB
    const tx = await Transaction.create({
      walletAddress: walletAddress || "unknown",
      amount: Number(amount) || 0,
      transactionType: "Razorpay",
      transactionSignature: razorpay_payment_id,
    });

    // Trigger on-chain action (placeholder)
    // IMPORTANT: implement your actual mint/transfer function depending on your chain
    try {
      if (walletAddress) {
        // e.g., await mintTokenOnChain(walletAddress, amount);
        console.log(`Would mint token for ${walletAddress} amount=${amount}`);
      }
    } catch (chainErr) {
      console.error("On-chain action failed:", chainErr);
      // Consider marking tx as pending or failed in DB — do NOT revert verification.
    }

    return res.status(200).json({ success: true, message: "Payment verified", transaction: tx });
  } catch (err) {
    console.error("verify-payment error:", err);
    return res.status(500).json({ success: false, message: "Server error verifying payment" });
  }
});

/* Optional: get transactions */
app.get("/api/transactions", async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 }).limit(200);
    res.status(200).json({ success: true, transactions: txs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching transactions" });
  }
})




app.get('/adddata',requireAuth, async(req, res) => {
   const name = "authhhh";
   const email = "authhhh@example.com";
   const password = "password";
    const user = await User.create({ name, email, password });
    res.status(200).json(user);
});

app.get('/getdata',requireAuth, async(req, res) => {
    console.log("inside getdata");
    
    const users = await User.find();
    res.status(200).json(users);
});

app.get('/api/auth/challenge', async(req, res) => {
    const publicKey = req.query.publicKey as string;

    if (!publicKey) {
        return res.status(400).json({ message: "Solana public key is required." });
    }

    try {
        // 1. Generate unique nonce message
        const nonceValue = crypto.randomBytes(16).toString('hex');
        const message = `Sign this message to prove ownership: ${nonceValue}`;
        
        const expiryDate = new Date(Date.now() + NONCE_TTL_MS);

        // 2. Store the nonce (updates if wallet already requested a challenge)
        const nonceRecord = await Nonce.findOneAndUpdate(
            { publicKey },
            { $set: { nonce: message, createdAt: new Date(), expiresAt: expiryDate } },
            { upsert: true, new: true }
        );

        // 3. Send the message back for signing
        return res.json({ nonce: message });

    } catch (error) {
        console.error('Challenge generation error:', error);
        return res.status(500).json({ message: "Server error during challenge creation." });
    }
});

app.post('/api/auth/verify', async(req, res) => {
    const { publicKey, nonce, signature } = req.body;
    if (!publicKey || !nonce || !signature) {
        return res.status(400).json({ message: "Missing required authentication fields." });
    }

    try {
        // 1. Retrieve the stored nonce for this public key
        const nonceRecord = await Nonce.findOne({ publicKey });
        if (!nonceRecord) {
            return res.status(400).json({ message: "No challenge found for this public key." });
        }

        const signatureBytes = bs58.decode(signature);
        const messageBytes = new TextEncoder().encode(nonce);
        const publicKeyBytes = bs58.decode(publicKey);
        
        const isVerified = nacl.sign.detached.verify(
            messageBytes,
            signatureBytes,
            publicKeyBytes
        );

        if (!isVerified) {
            return res.status(401).json({ message: "Signature verification failed. Invalid key or message." });
        }

        let user = await User.findOneAndUpdate(
            { walletAddress: publicKey },
            { $set: { lastLogin: new Date() } },
            { upsert: true, new: true }
        );
        if (!user) {
            return res.status(401).json({ message: "error getting user from database." });
        }

        await Nonce.deleteOne({ _id: nonceRecord._id });


        const payload = {
            userId: user.walletAddress,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });

        return res.json({ token, userId: user.walletAddress });


       
        
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ message: "Server error during verification." });
    }
})

app.post('/api/transactions/create', async(req, res) => {
    try {
        const {
            walletAddress,
            amount,
            transactionType,
            transactionSignature,
          } = req.body;

        console.log('req.body', req.body)
        if (!walletAddress || !amount || !transactionType || !transactionSignature) {
            return res.status(400).json({ message: "Missing required transaction fields." });
        }
        const transaction = await Transaction.create({ walletAddress, amount, transactionType, transactionSignature });
        console.log('transaction', transaction)
        if (!transaction) {
            return res.status(400).json({ message: "Error creating transaction." });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error('Transaction creation error:', error);
        return res.status(500).json({ message: "Server error during transaction creation." });
    }
});

app.get('/api/transactions', async(req, res) => {
    try {
        const transactions = await Transaction.find();
        console.log('transactions', transactions)
        res.status(200).json(transactions);
        if (!transactions) {
            return res.status(400).json({ message: "No transactions found." });
        }
        
    } catch (error) {
        console.error('Transaction fetching error:', error);
        return res.status(500).json({ message: "Server error during transaction fetching." });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
