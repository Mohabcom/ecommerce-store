import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import { toast } from 'react-toastify';

export default function NavbarAccount() {
    const session = useSession();

    const [accountActive, setAccountActive] = useState(false);
    const accountActiveRef = useRef();

    useEffect(() => {
        const accountDropdown = document.getElementById('account-dropdown');
        if (!accountActive) {
            setTimeout(() => {
                accountDropdown.classList.add('-z-50');
                accountDropdown.classList.add('invisible');
            }, 150);
        } else {
            accountDropdown.classList.add('visible');
        }
    }, [accountActive]);

    // Handling Click Outside of Dropdown
    useEffect(() => {
        const handler = (event) => {
            if (!accountActiveRef.current.contains(event.target)) {
                setAccountActive(false);
            }
        };
        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    });
    return (
        <div className="relative">
            {/* BUTTON */}
            <button
                onClick={() => setAccountActive(!accountActive)}
                className="flex gap-2 items-center"
            >
                <RxPerson className="text-xl" />
                Account
            </button>
            {/* DROPDOWN MENU */}
            <div
                id="account-dropdown"
                className={`${
                    accountActive
                        ? 'opacity-100 top-[220%] transition-all'
                        : 'opacity-0 top-[290%] transition-all'
                } absolute min-w-[200%] right-1/2 translate-x-1/2 bg-white p-4 rounded-xl z-50 border-gray-200 border shadow-2xl`}
                ref={accountActiveRef}
            >
                {session.status === 'authenticated' ? (
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="hover:text-green-700 transition-all"
                        >
                            Account
                        </Link>
                        <Link
                            href="/seller"
                            className="hover:text-green-700 transition-all"
                        >
                            Seller Center
                        </Link>
                        <div className="w-full border-t border rounded border-gray-900" />
                        <button
                            className="hover:text-red-700 transition-all"
                            onClick={async () => {
                                await signOut();
                                toast.success('Signed out successfuly');
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
