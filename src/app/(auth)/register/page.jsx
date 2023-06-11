'use client';
import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import { register_validate } from '@/lib/validate';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Register() {
    const session = useSession();
    const router = useRouter();

    const [show, setShow] = useState({
        password: false,
        confirmpassword: false,
    });
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
        onSubmit: async (values) => {
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    }),
                });
                res.status === 201 &&
                    router.push('/login?success=Account has been created');
            } catch (err) {
                setError(err);
                console.log(err);
            }
        },
        validate: register_validate,
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
    }
    if (session.status === 'unauthenticated') {
        return (
            <div className="mx-auto">
                <PaddingContainer className="block sm:flex items-center justify-center">
                    <div className="flex flex-col gap-4 items-center justify-center sm:bg-green-700 px-8 py-4 sm:p-8 sm:text-white sm:rounded-lg sm:my-16 md:px-16">
                        {/* <h2 className="text-3xl font-bold">Login</h2> */}
                        <div>
                            <h1 className="text-center text-3xl font-bold py-4 text-green-700 sm:text-white">
                                Sign up for an account
                            </h1>
                            <p className="text-center text-gray-500 sm:text-white">
                                Sign up for an account
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <input
                                type="text"
                                name="text"
                                placeholder="Name"
                                {...formik.getFieldProps('name')}
                                className={`p-4 rounded-md border w-full focus:outline-none text-gray-900 ${
                                    formik.errors.name &&
                                    formik.values.name &&
                                    formik.touched.name &&
                                    'border-red-500'
                                }`}
                            />
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
                                className={`relative flex border rounded-md bg-white ${
                                    formik.errors.password &&
                                    formik.values.password &&
                                    formik.touched.password &&
                                    'border-red-500'
                                }`}
                            >
                                <input
                                    type={`${
                                        show.password ? 'text' : 'password'
                                    }`}
                                    name="password"
                                    placeholder="Password"
                                    {...formik.getFieldProps('password')}
                                    className="p-4 rounded-md w-full bg-white focus:outline-none text-gray-900"
                                />
                                <button
                                    type="button"
                                    className="flex items-center px-4 hover:text-blue-900 transition-all"
                                    onClick={() =>
                                        setShow({
                                            ...show,
                                            password: !show.password,
                                        })
                                    }
                                >
                                    {show.password ? (
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
                            <div
                                className={`relative flex border rounded-md bg-white ${
                                    formik.errors.confirmpassword &&
                                    formik.values.confirmpassword &&
                                    formik.touched.confirmpassword &&
                                    'border-red-500'
                                }`}
                            >
                                <input
                                    type={`${
                                        show.confirmpassword
                                            ? 'text'
                                            : 'password'
                                    }`}
                                    name="password"
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps('confirmpassword')}
                                    className="p-4 rounded-md w-full bg-white focus:outline-none text-gray-900"
                                />
                                <button
                                    type="button"
                                    className="flex items-center px-4 hover:text-blue-900 transition-all"
                                    onClick={() =>
                                        setShow({
                                            ...show,
                                            confirmpassword:
                                                !show.confirmpassword,
                                        })
                                    }
                                >
                                    {show.confirmpassword ? (
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
                        <p className="text-center text-gray-500 sm:text-white">
                            Already have an account?{' '}
                            <Link href={'/login'} className="text-blue-900">
                                Sign In.
                            </Link>
                        </p>
                    </div>
                </PaddingContainer>
            </div>
        );
    }
}
