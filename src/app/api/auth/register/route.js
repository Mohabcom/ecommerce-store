import User from '../../../../models/User';
import connect from '../../../../lib/mongoose';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    const { name, email, password } = await request.json();

    await connect();

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        provider: 'credentials',
    });

    try {
        await newUser.save();
        return new NextResponse('User has been created', {
            status: 201,
        });
    } catch (err) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};
