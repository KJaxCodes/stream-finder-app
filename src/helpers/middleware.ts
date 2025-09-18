// Middleware to check if user is authenticated
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


// Define public routes that don't require authentication
const publicRoutes = ['/login', '/register'];

// Middleware function to check authentication
export function middleware(request: NextRequest) {
    // Allow public routes
    if (publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    // Get token from cookies
    const token = request.cookies.get('token')?.value;

    // Check if token exists
    if (token) {
        try {
            // Valid token, proceed to the next middleware or route handler
            console.log("Token found, verifying...");
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
            return NextResponse.next();
        } catch (err: any) {
            // Invalid token, redirect to login
            console.log("Authentication error:", err.message);
            return NextResponse.redirect(new URL('/login', request.url));
        } 
    } else {
            // No token, redirect to login
            console.log("No token found, redirecting to login");
            return NextResponse.redirect(new URL('/login', request.url));
        }

}