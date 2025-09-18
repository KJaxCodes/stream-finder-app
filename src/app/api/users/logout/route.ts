import { NextResponse } from "next/server";

// Logout route to clear the authentication token
export async function GET() {
    try {
        const response: any = NextResponse.json(
            {
                message: 'Logout successful',
                success: true,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true,
                path: '/',
                maxAge: 0
            });
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
