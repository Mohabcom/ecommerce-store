'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
    AiOutlineClose,
    AiOutlineDown,
    AiOutlineMenu,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import { RxPerson } from 'react-icons/rx';
import { BsTelephone } from 'react-icons/bs';
import PaddingContainer from '../PaddingContainer/PaddingContainer';
import Reveal from '../Reveal/Reveal';
import { signOut, useSession } from 'next-auth/react';

export const categories = [
    {
        name: 'Furniture',
        NumberOfItems: 240,
    },
    {
        name: 'Headphones',
        NumberOfItems: 240,
    },
    {
        name: 'Shoes',
        NumberOfItems: 240,
    },
    {
        name: 'Bags',
        NumberOfItems: 240,
    },
    {
        name: 'Laptops',
        NumberOfItems: 240,
    },
    {
        name: 'Books',
        NumberOfItems: 240,
    },
];

export default function Navbar() {
    const session = useSession();

    const [searchActive, setSearchActive] = useState(false);
    const searchActiveRef = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!searchActiveRef.current.contains(event.target)) {
                setSearchActive(false);
            }
        };
        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    });
    useEffect(() => {
        const searchResult = document.getElementById('search-result-dropdown');
        if (!searchActive) {
            setTimeout(() => {
                searchResult.classList.add('w-0');
                searchResult.classList.add('h-0');
                searchResult.classList.add('overflow-hidden');
                searchResult.classList.add('p-0');
                searchResult.classList.add('-z-50');
                searchResult.classList.add('opacity-0');
            }, 200);
        }
    }, [searchActive]);

    const [accountActive, setAccountActive] = useState(false);
    const accountActiveRef = useRef();

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

    useEffect(() => {
        const accountDropdown = document.getElementById('account-dropdown');
        if (!accountActive) {
            setTimeout(() => {
                accountDropdown.classList.add('w-0');
                accountDropdown.classList.add('h-0');
                accountDropdown.classList.add('overflow-hidden');
                accountDropdown.classList.add('p-0');
                accountDropdown.classList.add('-z-50');
                accountDropdown.classList.add('opacity-0');
            }, 200);
        }
    }, [accountActive]);

    const [isNavOpen, setisNavOpen] = useState(false);
    const [isMobileSearchOpen, setisMobileSearchOpen] = useState(false);

    const toggleMobileSearch = () => {
        setisMobileSearchOpen(!isMobileSearchOpen);
    };

    useEffect(() => {
        const mobileNav = document.getElementById('mobile-nav');
        if (!isNavOpen) {
            setTimeout(() => {
                mobileNav.classList.add('hidden');
                setTimeout(() => {
                    mobileNav.classList.add('block');
                }, 500);
            }, 500);
        }
    }, [isNavOpen]);

    useEffect(() => {
        const mobileSearch = document.getElementById('mobile-search');
        if (!isMobileSearchOpen) {
            setTimeout(() => {
                mobileSearch.classList.add('hidden');
                setTimeout(() => {
                    mobileSearch.classList.add('block');
                }, 500);
            }, 500);
        }
    }, [isMobileSearchOpen]);

    return (
        <header>
            <div className="bg-green-700 h-[28px] text-white text-sm">
                <PaddingContainer className="flex items-center justify-between h-full px-4">
                    <div className="flex items-center gap-2">
                        <BsTelephone />
                        +0012345678910
                    </div>
                    <div className="hidden lg:flex gap-4">
                        <div>Get 50% Off on Selected Items</div>
                        <div>|</div>
                        <div>
                            <Link href="/">Shop Now</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-16">
                        <button className="flex items-center gap-2">
                            Eng <AiOutlineDown />
                        </button>
                        <button className="flex items-center gap-2">
                            Location <AiOutlineDown />
                        </button>
                    </div>
                </PaddingContainer>
            </div>
            <PaddingContainer>
                <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
                    {/* LOGO */}
                    <div className="font-bold text-xl">
                        <Link href="/">LOGO</Link>
                    </div>

                    <div
                        className={`hidden lg:flex lg:gap-8 xl:gap-16 items-center ${
                            searchActive
                                ? 'gap-0 transition-all ease-in-out duration-500 '
                                : ''
                        }`}
                    >
                        {/* NAV LINKS */}
                        <div
                            className={`${
                                searchActive
                                    ? 'opacity-0 translate-x-[300px] ml-[-400px] transition-all ease-in-out duration-500 '
                                    : 'opacity-100 transition-all ease-in-out duration-500'
                            } flex gap-8 items-center`}
                        >
                            <Link href="/" className="flex gap-2 items-center">
                                Categories
                                <AiOutlineDown />
                            </Link>
                            <Link href="/">Deals</Link>
                            <Link href="/">What’s New</Link>
                            <Link href="/">Delivery</Link>
                        </div>

                        {/* SEARCH BAR */}
                        <div className="relative" ref={searchActiveRef}>
                            <div className="border border-gray-400 rounded-full flex relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className={`${
                                        searchActive
                                            ? 'pr-[300px] transition-all ease-in-out duration-500'
                                            : 'pr-0 transition-all ease-in-out duration-500'
                                    } py-2 px-4 focus:outline-none w-full rounded-full `}
                                    onFocus={() => setSearchActive(true)}
                                    // onBlur={() => setSearchActive(false)}
                                />
                                <AiOutlineSearch className="text-[20px] text-gray-500 absolute right-4 top-[10px]" />
                            </div>
                            <div
                                id="search-result-dropdown"
                                className={`${
                                    searchActive
                                        ? 'opacity-100 top-[150%] translate-x-4 transition-all ease-in-out duration-2b00'
                                        : 'opacity-0 top-[200%] -translate-x-4 transition-all ease-in-out duration-200'
                                } absolute w-full right-3 bg-white p-4 rounded-xl z-50`}
                            >
                                <h2 className="text-lg">Popular Categories</h2>
                                <div className="w-full border-t border-black mb-4" />
                                <div className="flex flex-wrap gap-4 items-center justify-center">
                                    {categories.map((category) => {
                                        return (
                                            <div
                                                key={category.name}
                                                className="bg-gray-400 rounded-lg w-2/5 p-4 grow"
                                            >
                                                <h3 className="font-bold">
                                                    {category.name}
                                                </h3>
                                                <p>
                                                    {category.NumberOfItems}{' '}
                                                    items found
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACCOUNT AND CART */}
                    <div className="hidden lg:flex gap-8">
                        <div className="relative">
                            <button
                                onClick={() => setAccountActive(!accountActive)}
                                className="flex gap-2 items-center"
                            >
                                <RxPerson className="text-xl" />
                                Account
                            </button>
                            <div
                                id="account-dropdown"
                                className={`${
                                    accountActive
                                        ? 'opacity-100 top-[220%] transition-all ease-in-out duration-2b00'
                                        : 'opacity-0 top-[290%] transition-all ease-in-out duration-200'
                                } absolute min-w-[200%] right-1/2 translate-x-1/2 bg-white p-4 rounded-xl z-50`}
                                ref={accountActiveRef}
                            >
                                {/* <h2 className="text-lg">Account</h2> */}
                                {/* <div className="w-full border-t border-black mb-2" /> */}
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
                                            onClick={() => signOut()}
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
                        <Link href="/" className="flex gap-2 items-center">
                            <AiOutlineShoppingCart className="text-xl" />
                            Cart
                        </Link>
                    </div>

                    {/*   MOBILE SEARCH AND BURGER NAV   */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={toggleMobileSearch}
                            className="text-xl flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out"
                        >
                            <AiOutlineSearch />
                        </button>
                        <button
                            onClick={() => {
                                setisNavOpen(!isNavOpen);
                            }}
                            className="text-xl flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out"
                        >
                            <AiOutlineMenu />
                        </button>
                    </div>

                    {/*       MOBILE NAV      */}
                    {
                        <div
                            id="mobile-nav"
                            className={`w-screen h-screen overflow-hidden absolute top-0 left-0 lg:hidden ${
                                isNavOpen ? 'block' : ''
                            }`}
                        >
                            <div
                                className={`w-screen h-screen absolute bg-white z-50 top-0 lg:hidden ${
                                    isNavOpen
                                        ? 'left-0 transition-all ease-in-out duration-500'
                                        : 'left-full transition-all ease-in-out duration-500'
                                }`}
                            >
                                <div className="w-full flex px-6 py-4 justify-between items-center">
                                    <div className="font-bold text-xl">
                                        <Link href="/">LOGO</Link>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setisNavOpen(!isNavOpen);
                                        }}
                                        className="p-4 text-gray-600 focus:outline-none text-xl"
                                    >
                                        <AiOutlineClose />
                                    </button>
                                </div>

                                {/* NAV LINKS */}
                                <div className="mt-8 text-xl flex flex-col gap-6 w-full items-center justify-center">
                                    <Link
                                        href="/"
                                        className="flex gap-2 items-center"
                                    >
                                        Categories
                                        {/* <AiOutlineDown /> */}
                                    </Link>
                                    <Link href="/">Deals</Link>
                                    <Link href="/">What’s New</Link>
                                    <Link href="/">Delivery</Link>
                                </div>
                            </div>
                        </div>
                    }
                    {/*       MOBILE SEARCH     */}
                    {
                        <div
                            id="mobile-search"
                            className={`w-screen h-screen overflow-hidden absolute top-0 left-0 lg:hidden ${
                                isMobileSearchOpen ? 'block' : ''
                            }`}
                        >
                            <div
                                className={`w-screen h-screen overflow-hidden absolute backdrop-blur-3xl z-50 top-0 left-0 lg:hidden ${
                                    isMobileSearchOpen
                                        ? 'opacity-100'
                                        : 'opacity-0 transition-all duration-500 ease-in-out'
                                }`}
                            >
                                <div className="w-full flex px-6 py-4 justify-end items-center">
                                    <button
                                        onClick={toggleMobileSearch}
                                        className="p-4 text-gray-600 focus:outline-none text-xl"
                                    >
                                        <AiOutlineClose />
                                    </button>
                                </div>
                                <div className="h-full w-full flex flex-col items-center mt-8">
                                    <div className="border border-gray-400 rounded-xl flex relative  mb-8 w-5/6">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className={` py-2 px-4 focus:outline-none w-full rounded-xl `}
                                        />
                                        <AiOutlineSearch className="text-[20px] text-gray-500 absolute right-4 top-[10px]" />
                                    </div>
                                    <div
                                        className={`w-3/4 right-3 bg-white p-4 rounded-xl z-50`}
                                    >
                                        <h2 className="text-lg">
                                            Popular Categories
                                        </h2>
                                        <div className="w-full border-t border-black mb-4" />
                                        <div className="flex flex-wrap gap-4 items-center justify-center">
                                            {categories.map((category) => {
                                                return (
                                                    <div
                                                        key={category.name}
                                                        className="bg-gray-400 rounded-lg w-2/5 p-4 grow"
                                                    >
                                                        <h3 className="font-bold">
                                                            {category.name}
                                                        </h3>
                                                        <p>
                                                            {
                                                                category.NumberOfItems
                                                            }{' '}
                                                            items found
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </nav>
            </PaddingContainer>
        </header>
    );
}
