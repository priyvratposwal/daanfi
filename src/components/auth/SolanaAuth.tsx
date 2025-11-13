// src/components/SolanaAuthButton.tsx

import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import bs58 from 'bs58'; // To encode the signature
import { WalletButton } from '../solana/solana-provider';

const API_URL = 'http://localhost:3000/api/auth';

export const SolanaAuthButton = () => {
  const { publicKey, signMessage } = useWallet();

  const handleAuth = async () => {
    if (!publicKey || !signMessage) {
      alert("Please connect your wallet first.");
      
      return;
    }

    const walletAddress = publicKey.toBase58();

    try {
      // 1. Request Challenge (Nonce)
      const challengeResponse = await axios.get(`${API_URL}/challenge?publicKey=${walletAddress}`);
      const nonce = challengeResponse.data.nonce;
      
      // 2. Sign the Nonce
      // Wallet signs the message (nonce) as raw bytes
      const messageBytes = new TextEncoder().encode(nonce);
      const signature = await signMessage(messageBytes);
      const signatureBase58 = bs58.encode(signature);

      // 3. Verify Signature & Log In
      const verificationResponse = await axios.post(`${API_URL}/verify`, {
        publicKey: walletAddress,
        nonce: nonce,
        signature: signatureBase58,
      });

      const token = verificationResponse.data.token;
      
      // Success! Store the token (e.g., in localStorage or state)
      localStorage.setItem('authToken', token);
      alert('Authentication successful! Token received.');

    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Check console for details.');
    }
  };

  return (
    <div>
      <WalletButton />
      <button onClick={handleAuth} disabled={!publicKey}>
        {publicKey ? `Sign in with ${publicKey.toBase58().slice(0, 6)}...` : ""}
      </button>
    </div>
  );
};