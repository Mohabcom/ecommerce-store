'use client';
import React, { useEffect, useState } from 'react';
import Logo from '../../components/seller/Logo/Logo';
import SellerNav from '../../components/seller/SellerNav/SellerNav';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PaddingContainer from '../../components/PaddingContainer/PaddingContainer';

export default function layout({ children }) {
    const [isNavActive, setIsNavActive] = useState(false);
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session.status === 'unauthenticated') {
            router.push('/login');
        }
    }, [session.status]);

    if (session.status === 'loading') {
        return (
            <PaddingContainer className="items-center justify-center flex">
                <p>Loading...</p>
            </PaddingContainer>
        );
    }
    return (
        <div className="bg-green-700 min-h-screen">
            <div className="flex items-center justify-center p-4 text-white md:hidden">
                <div>
                    <button onClick={() => setIsNavActive(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center grow mr-4">
                    <Logo />
                </div>
            </div>
            <div className="flex h-screen">
                <SellerNav
                    isNavActive={isNavActive}
                    setIsNavActive={setIsNavActive}
                />
                <div className="bg-white flex-grow h-full p-4 overflow-y-scroll overflow-x-hidden">{children}</div>
            </div>
        </div>
    );
}
