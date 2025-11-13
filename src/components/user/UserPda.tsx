// src/components/UserPda.tsx

import { AppHeader } from '../app-header'
import { useUserData } from './user-data-access'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/use-anchor-provider'

export const UserPda = () => {
    
    const { publicKey, connected } = useWallet() 
    const { cluster } = useCluster()
    const provider = useAnchorProvider()

   
    const { userProfileAccount } = useUserData({
        address: publicKey || undefined, 
        cluster: cluster, 
        provider: provider,
        enabled: connected, 
    })

   
    if (!connected || !publicKey) {
        return (
            <div>
                <AppHeader links={[{ label: 'UserPda', path: '/user-pda' }]} />
                <p className="p-4">Please connect your wallet to view your PDA.</p>
            </div>
        )
    }

    if (userProfileAccount.isLoading) {
        return <div>Loading user profile...</div>
    }

    if (userProfileAccount.isError) {
        return <div>
            Error loading profile: {userProfileAccount.error.message}
        </div>
    }
    
    return (
        <div>
            <h1>User PDA</h1>
            <pre>User Profile Account: {JSON.stringify(userProfileAccount.data, null, 2)}</pre>
        </div>
    )
}