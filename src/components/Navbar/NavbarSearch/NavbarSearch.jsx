import { categories } from '../../../data/categories';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

export default function NavbarSearch({
    searchActive,
    setSearchActive,
    isMobileSearchOpen,
    setisMobileSearchOpen,
}) {
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
        const searchResultDropdown = document.getElementById(
            'search-result-dropdown',
        );
        if (!searchActive) {
            setTimeout(() => {
                searchResultDropdown.classList.add('-z-50');
                searchResultDropdown.classList.add('invisible');
            }, 150);
        } else {
            searchResultDropdown.classList.add('visible');
        }
    }, [searchActive]);

    return (
        <div>
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
                                    <p>{category.NumberOfItems} items found</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/*       MOBILE SEARCH     */}
            {
                <div
                    className={`w-screen h-screen overflow-hidden absolute top-0 left-0 lg:hidden ${
                        isMobileSearchOpen ? 'block' : 'hidden'
                    }`}
                >
                    <div
                        className={`w-screen h-screen overflow-hidden absolute backdrop-blur-3xl top-0 left-0 lg:hidden ${
                            isMobileSearchOpen
                                ? 'opacity-100 z-50'
                                : 'opacity-0 transition-all duration-500 ease-in-out -z-50'
                        }`}
                    >
                        <div className="w-full flex px-6 py-4 justify-end items-center">
                            <button
                                onClick={() => {
                                    setisMobileSearchOpen(false);
                                }}
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
                </div>
            }
        </div>
    );
}
