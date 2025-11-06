import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isEmail } from "validator";

// Error handling for unique email is managed in the signup logic
// Error handling for password length is managed in the signup logic
// Redirect to login page after successful signup

// POST /api/users/signup
export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { email, password } = reqBody;

        //Email validation
        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }
        if (!isEmail(email)) {
            return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
        }

        //Password validation
        if (!password) {
            return NextResponse.json({ message: 'Password is required' }, { status: 400 });
        }
        if (password.length < 8) {
            return NextResponse.json({ message: 'Password must be at least 8 characters long' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            user: { email: savedUser.email, id: savedUser._id }
        },
            { status: 201 });

    } catch (error: unknown) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown signup error" }, { status: 500 });
    }
}