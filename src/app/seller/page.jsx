'use client';
import { useSession } from 'next-auth/react';

export default function Seller() {
    const { data: session } = useSession();
    return (
        <div className="text-accent flex justify-between">
            <h2>
                Hello, <b>{session?.user?.name}</b>!
            </h2>
            <div className="flex bg-gray-200 gap-1 text-black rounded-lg overflow-hidden">
                <img
                    src={session?.user?.image}
                    alt=""
                    className="w-8 h-8"
                ></img>
                <span className="py-1 px-2">{session?.user?.name}</span>
            </div>
        </div>
    );
}
