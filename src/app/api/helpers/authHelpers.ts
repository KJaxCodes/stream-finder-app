import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// JWT imports
import { verify } from "jsonwebtoken";
// types
import type { UserTokenData } from '@/app/types/shared/types';

// Function to authenticate JWT token
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

// Function to protect routes that require authentication
export const runProtectedRoute = async (): Promise<void> => {
  if (typeof window !== 'undefined') return;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !authenticateToken(token)) return redirect('/login');
};

// Function to redirect authenticated users to authenticated homepage
export const redirectIfAuthenticated = async (): Promise<void> => {
  if (typeof window !== 'undefined') return;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token && authenticateToken(token)) return redirect('/home');
};

// Function to verify authentication on the server side
export const verifyServerAuth = async (): Promise<UserTokenData | null> => {
  // Get cookies from the request
  const cookieStore = await cookies();
  // Extract the token from cookies
  const token = cookieStore.get("token");
  if (!token) return null;
  // Authenticate the token
  const decoded = authenticateToken(token.value);
  // If token is missing or invalid, throw an error
  if (!decoded) return null;
  // Return the decoded user data so it can be used in the server-side logic
  return decoded;
};