import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

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
        const tokenData = { 
            id: user._id, 
            email: user.email 
        };

        // create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        })

        response.cookies.set('token', token, { httpOnly: true });

        return response;
        

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}