import { NextResponse } from "next/server";

// Logout route to clear the authentication token
// DELETE /api/users/logout
export async function DELETE() {
    try {
        const response: any = NextResponse.json(
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
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
