// src/components/User.tsx

import axios from 'axios';
import { useEffect, useState } from 'react'; // <-- Added useState
import { toast } from 'sonner'; // <-- Use a library like sonner/react-toastify for non-blocking UI feedback

interface UserData {
    // Define the expected structure of your user data from MongoDB
    walletAddress: string;
    totalDonatedU64: number;
    // Add other fields from your User schema as needed
}

export const User = () => {
    const [userData, setUserData] = useState<UserData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                // If token is missing, user is not logged in.
                console.warn('Authentication token not found.');
                setError('Please sign in to view this data.');
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get<UserData[]>('http://localhost:3000/getdata', {
                    headers: {
                        // Ensure the token exists before adding 'Bearer'
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Store the fetched data in component state
                setUserData(res.data);
                
                toast.success('User data loaded successfully.'); // Use a non-blocking toast

            } catch (err) {
                // Handle 401 Unauthorized errors from the middleware
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    setError('Session expired. Please sign in again.');
                    // Optionally clear the invalid token: localStorage.removeItem('authToken');
                } else {
                    setError('Failed to fetch data.');
                }
                console.error('API Error:', err);

            } finally {
                setIsLoading(false);
            }
        }
        
        fetchUser();
    }, []);
    
    // --- Render Logic ---
    
    if (isLoading) {
        return <div>Loading user data...</div>;
    }
    
    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }
    
    return (
        <div>
            <h1>User Profile Data</h1>
            <p>Status: Authenticated</p>
            
            {/* Display fetched data */}
            {userData && userData.map((user, index) => (
                <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <p><strong>Wallet Address:</strong> {user.walletAddress}</p>
                    <p><strong>Total Donated:</strong> {user.totalDonatedU64}</p>
                </div>
            ))}
            
            {!userData?.length && <p>No user data records found.</p>}
        </div>
    )
}