import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();
        console.log("Run the login route");
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
        }

        // create token data
        const tokenData: { id: string; email: string } = {
            id: String(user._id),
            email: user.email
        };

        // create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'Login successful',
            user: tokenData,
            success: true,
        })

        response.cookies.set('token', token, { httpOnly: true });

        return response;


    } catch (error: any) {
        console.log("Error in login route:", error);
        return NextResponse.json({ message: error.message, user: null, success: false }, { status: 500 });
    }
}