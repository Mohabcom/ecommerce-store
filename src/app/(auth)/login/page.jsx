'use client';
import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import { login_validate } from '../../../lib/validate';
import { useFormik } from 'formik';
import { getSession, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login({ searchParams }) {
    const session = useSession();
    const router = useRouter();
    const [show, setShow] = useState();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            const status = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: '/',
            });
            const session = await getSession();
            if (status.ok) router.push(status.url);
        },
        validate: login_validate,
    });

    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/');
        }
    }, [session.status]);

    if (session.status === 'loading') {
        return (
            <PaddingContainer className="items-center justify-center flex">
                <p>Loading...</p>
            </PaddingContainer>
        );
    } else if (session.status === 'unauthenticated') {
        return (
            <div className="mx-auto">
                <PaddingContainer className="block sm:flex flex-col items-center justify-center">
                    {searchParams.success && (
                        <h2 className="text-green-700 text-lg">
                            Account has been created
                        </h2>
                    )}
                    <div className="flex flex-col gap-4 items-center justify-center sm:bg-green-700 px-8 py-4 sm:p-8 sm:text-white sm:rounded-lg sm:my-16 md:px-16">
                        {/* <h2 className="text-3xl font-bold">Login</h2> */}
                        <div>
                            <h1 className="text-center text-3xl font-bold py-4 text-green-700 sm:text-white">
                                Sign In to your account
                            </h1>
                            <p className="text-center text-gray-500 sm:text-white">
                                Sign In to your account
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-4 w-full"
                            onSubmit={formik.handleSubmit}
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                {...formik.getFieldProps('email')}
                                className={`p-4 rounded-md border w-full focus:outline-none text-gray-900 ${
                                    formik.errors.email &&
                                    formik.values.email &&
                                    formik.touched.email &&
                                    'border-red-500'
                                }`}
                            />
                            <div
                                className={`relative flex border rounded-md  bg-white ${
                                    formik.errors.password &&
                                    formik.values.password &&
                                    formik.touched.password &&
                                    'border-red-500'
                                }`}
                            >
                                <input
                                    type={`${show ? 'text' : 'password'}`}
                                    name="password"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                    className="p-4 rounded-md w-full bg-white focus:outline-none text-gray-900"
                                />
                                <button
                                    type="button"
                                    className="flex items-center px-4 hover:text-blue-900 transition-all"
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? (
                                        <AiOutlineEyeInvisible
                                            size={25}
                                            className="text-gray-500"
                                        />
                                    ) : (
                                        <AiOutlineEye
                                            size={25}
                                            className="text-gray-500"
                                        />
                                    )}
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <button className="bg-green-700 font-bold text-white px-6 py-4 sm:bg-transparent sm:border-gray-300 sm:border-2 rounded">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="w-full border-t border-2 rounded border-green-700 sm:border-white my-2" />
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={() => signIn('google')}
                                className="w-full font-bold text-green-700 sm:text-white px-6 py-4 bg-transparent border-green-700 border-2 sm:bg-transparent sm:border-gray-300 sm:border-2 rounded"
                            >
                                Sign in with Google
                            </button>
                            {/* <button
                                // onClick={() => signIn('github')}
                                color="transparent"
                                className="w-full font-bold text-green-700 sm:text-white px-6 py-4 bg-transparent border-green-700 border-2 sm:bg-transparent sm:border-gray-300 sm:border-2 rounded"
                            >
                                Sign in with Github
                            </button> */}
                        </div>
                        <p className="text-center text-gray-500 sm:text-white">
                            Don't have an account yet?{' '}
                            <Link href={'/register'} className="text-blue-900">
                                Sign Up.
                            </Link>
                        </p>
                    </div>
                </PaddingContainer>
            </div>
        );
    }
}
