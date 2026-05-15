'use client';
import { authClient } from "../../lib/auth-client";
import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
    const router = useRouter();

    async function handleLogout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/auth/login');
                },
                onError: (err) => {
                    console.error('Logout failed:', err);
                }
            },
        });
    }

    return <button className="px-4 py-2 bg-[#ff6f3d] text-white rounded-2xl" onClick={handleLogout}>
        Logout
    </button>;
};

export default Logout;