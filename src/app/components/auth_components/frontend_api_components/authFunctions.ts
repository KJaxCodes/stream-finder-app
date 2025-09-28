import axios from "axios";
//
import type { IUser } from "@/models/userModel";

export const handleSignup = async (email: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post('/api/users/signup', { email, password });
        const { success, message } = response.data;
        console.log(success, message);
        return true;
    } catch (error: unknown) {
        console.error('Signup error:', error);
        return false;

    }
}

type UserData= { id: string; email: string };

type LoginResponse = {
    success: boolean;
    user: UserData | null;
    message: string;
}

export const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post('/api/users/login', { email, password });
        const data: { success: boolean, user: UserData | null, message: string } = response.data;
        const { success, message, user } = data;
        // login failed, send data to process by React.context
        if (!success) {
            return { success: false, user: null, message };
        }

        return { success: true, user: null, message };
    } catch (error: unknown) {
        console.error('Login error:', error);
        return { success: false, user: null, message: "Login error" };
    }
};