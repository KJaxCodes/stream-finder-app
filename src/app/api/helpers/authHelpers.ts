import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// JWT imports
import { verify } from "jsonwebtoken";
// types
import type { UserTokenData } from '@/app/types/shared/types';

// Function to authenticate token and return user data if valid

export const authenticateToken = (token: string | undefined): UserTokenData | null => {
  if (!token) {
    return null;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return null;
    }

    const decoded = verify(token, secret) as UserTokenData;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const runProtectedRoute = async (): Promise<void> => {
    if (typeof window !== 'undefined') return;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !authenticateToken(token)) return redirect('/login');
};

export const redirectIfAuthenticated = async (): Promise<void> => {
    if (typeof window !== 'undefined') return;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token && authenticateToken(token)) return redirect('/home');
};


// Function to verify authentication on server side
export const verifyServerAuth = async (): Promise<UserTokenData> => {
  // Get cookies from the request
    const cookieStore = await cookies();
  // Extract the token from cookies  
    const token = cookieStore.get("token")?.value;
  // Authenticate the token
    const decoded = authenticateToken(token);
  // If token is missing or invalid, throw an error
    if (!token || !decoded) {
        console.log("Authentication failed");
        throw new Error("login expired");
    }
  // Return the decoded user data so it can be used in the server-side logic  
    return decoded;
}