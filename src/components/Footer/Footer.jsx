import React from 'react';
import PaddingContainer from '../PaddingContainer/PaddingContainer';
import Link from 'next/link';
import Image from 'next/image';
import stripeLogo from '../../../public/Stripe_Logo.png';

export default function Footer() {
    return (
        <div>
            <PaddingContainer className="px-4">
                <div className="w-full border-t border-gray-500 my-4" />
                <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="text-3xl">LOGO</div>
                        <p className="max-w-[300px] leading-tight">
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint. Velit officia consequat
                            duis enim velit mollit.
                        </p>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">
                                Accepted Payments
                            </h3>
                            <div className="border-gray-400 border p-2 rounded h-8 w-16 relative">
                                <Image
                                    src={stripeLogo}
                                    alt="stripe"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-gray-800 text-lg">
                            Department
                        </h3>
                        <div className="flex flex-col gap-2 text-sm mt-6">
                            <Link className='hover:text-green-600 transition-all' href="/">Fashion</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Education Product</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Frozen Food</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Beverages</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Organic Grocery</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Office Supplies</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Beauty Products</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Books</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Electronics & Gadget</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Travel Accessories</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Fitness</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Sneakers</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Toys</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Furniture</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-gray-800 text-lg">
                            About Us
                        </h3>
                        <div className="flex flex-col gap-2 text-sm mt-6">
                            <Link className='hover:text-green-600 transition-all' href="/">About</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Careers</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">News & Blog</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Help</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Press Center</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Shop By Location</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Brands</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Affiliate & Partners</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Ideas & Guides</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-gray-800 text-lg">
                            Services
                        </h3>
                        <div className="flex flex-col gap-2 text-sm mt-6">
                            <Link className='hover:text-green-600 transition-all' href="/">Gift Cards</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Mobile App</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Shipping & Delivery</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Order Pickup</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Account Signup</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-gray-800 text-lg">
                            Help
                        </h3>
                        <div className="flex flex-col gap-2 text-sm mt-6">
                            <Link className='hover:text-green-600 transition-all' href="/">Returns</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Track Orders</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Contact Us</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Feedback</Link>
                            <Link className='hover:text-green-600 transition-all' href="/">Security & Fraud</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-gray-500 mt-8" />
                <div className="flex justify-center items-center py-2">
                    <p className="font-bold">All Rights Reserved. </p>
                </div>
            </PaddingContainer>
        </div>
    );
}
