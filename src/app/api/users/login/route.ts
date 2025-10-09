// Next.js imports
import { NextRequest, NextResponse } from "next/server";
// Node library imports
import path from "path";
import fs from 'fs';
// Third party imports
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// models
import User from "@/models/userModel";
// database connection
import { connect } from "@/dbConfig/dbConfig";

// POST /api/users/login
// login user and return a token in an httpOnly cookie
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
        if (!process.env.JWT_SECRET) { 
            // write error to a file
            try {
                console.error("JWT_SECRET is not defined in environment variables");
                const logFile = `jwt_error_log`;
                // find the log file at project root /logs
                const logFilePath = path.join(process.cwd(), 'src', 'logs', logFile);
                fs.appendFileSync(logFilePath, `User login attempt failed: ${email} ${new Date().toISOString()} - JWT_SECRET is not defined\n`);
            } catch (error) {
                console.error("Error writing to log file:", error);
            }
            return NextResponse.json({ message: 'Login error', user: null, success: false }, { status: 500 });
        };

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