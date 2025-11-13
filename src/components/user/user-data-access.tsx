// src/hooks/user-data-access.tsx

import { useMemo } from "react";

import { Cluster, PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { getBasicProgram, getBasicProgramId } from "@project/anchor";
import { SolanaCluster } from "../cluster/cluster-data-access";
import { AnchorProvider } from "@coral-xyz/anchor";

export const useUserData = ({address, cluster, provider, enabled}: {
    address: PublicKey | undefined, 
    cluster: SolanaCluster, 
    provider: AnchorProvider, 
    enabled: boolean 
}) => {
   
    const effectiveKey = address || PublicKey.default; 
    
    
    const programId = useMemo(() => getBasicProgramId(cluster.network as Cluster), [cluster]);
    
    const program = useMemo(() => getBasicProgram(provider, programId), [provider, programId]);
   
    
    const [config] = PublicKey.findProgramAddressSync([Buffer.from("config")], program.programId)
    const [userProfile] = PublicKey.findProgramAddressSync([Buffer.from("user_profile"), config.toBuffer(), effectiveKey.toBuffer()], program.programId)
    
    
    const userProfileAccount = useQuery({
        queryKey: ['userProfile', effectiveKey.toBase58(), cluster.network],
        queryFn: () => program.account.userProfile.fetch(userProfile),
        enabled: enabled,
    });
    
    return {
        userProfileAccount,
    };
}