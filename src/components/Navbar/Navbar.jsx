'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import {
    AiOutlineClose,
    AiOutlineDown,
    AiOutlineMenu,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import PaddingContainer from '../PaddingContainer/PaddingContainer';
import NavbarAccount from './NavbarAccount/NavbarAccount';
import NavbarSearch from './NavbarSearch/NavbarSearch';
import LanguageBar from './LanguageBar/LanguageBar';

export default function Navbar() {
    const [searchActive, setSearchActive] = useState(false);

    const [mobileNav, setMobileNav] = useState(false);
    const [isMobileSearchOpen, setisMobileSearchOpen] = useState(false);

    return (
        <header>
            <LanguageBar />
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
                        <NavbarSearch
                            searchActive={searchActive}
                            setSearchActive={setSearchActive}
                            isMobileSearchOpen={isMobileSearchOpen}
                            setisMobileSearchOpen={setisMobileSearchOpen}
                        />
                    </div>

                    {/* ACCOUNT AND CART */}
                    <div className="hidden lg:flex gap-8">
                        <NavbarAccount />

                        <Link href="/" className="flex gap-2 items-center">
                            <AiOutlineShoppingCart className="text-xl" />
                            Cart
                        </Link>
                    </div>

                    {/*   MOBILE SEARCH AND BURGER NAV ICONS  */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={() => {
                                setisMobileSearchOpen(true);
                            }}
                            className="text-xl flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out"
                        >
                            <AiOutlineSearch />
                        </button>
                        <button
                            onClick={() => {
                                setMobileNav(true);
                            }}
                            className="text-xl flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out"
                        >
                            <AiOutlineMenu />
                        </button>
                    </div>

                    {/*       MOBILE NAV      */}
                    <aside
                        className={`w-screen h-screen z-50 overflow-hidden absolute top-0 left-0 lg:hidden bg-white ${
                            mobileNav ? 'block' : 'hidden'
                        }`}
                    >
                        <div
                            className={`-full flex px-6 py-4 justify-between items-center`}
                        >
                            <div className="font-bold text-xl">
                                <Link href="/">LOGO</Link>
                            </div>
                            <button
                                onClick={() => {
                                    setMobileNav(false);
                                }}
                                className="p-4 text-gray-600 focus:outline-none text-xl"
                            >
                                <AiOutlineClose />
                            </button>
                        </div>

                        {/* NAV LINKS */}
                        <div className="mt-8 text-xl flex flex-col gap-6 w-full items-center justify-center">
                            <Link href="/" className="flex gap-2 items-center">
                                Categories
                                {/* <AiOutlineDown /> */}
                            </Link>
                            <Link href="/">Deals</Link>
                            <Link href="/">What’s New</Link>
                            <Link href="/">Delivery</Link>
                        </div>
                    </aside>
                </nav>
            </PaddingContainer>
        </header>
    );
}
