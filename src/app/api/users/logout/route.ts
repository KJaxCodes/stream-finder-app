import { NextResponse } from "next/server";

// Logout route to clear the authentication token
// DELETE /api/users/logout
export async function DELETE() {
    try {
        const response = NextResponse.json(
            {
                message: 'Logout successful',
                success: true,
            }, { status: 200 }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true,
                path: '/',
                maxAge: 0
            });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in DELETE /api/users/logout:", error.message);
            return NextResponse.json({ message: 'Logout failed', success: false }, { status: 500 });
        } else {
            console.error("Unknown error in DELETE /api/users/logout");
            return NextResponse.json({ message: 'Logout failed, major error', success: false }, { status: 500 });
        }
    }
};
