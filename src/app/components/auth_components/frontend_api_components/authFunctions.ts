import axios from "axios";
//
import type { IUser } from "@/models/userModel";
import type { AxiosResponse } from "node_modules/axios/index.cjs";

export const handleSignup = async (email: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post("/api/users/signup", { email, password });
        const { succcess, message } = response.data;
        console.log(succcess, message);
        return true;
    } catch (error: unknown) {
        console.log(error);
        return false;
    }
};

type UserData = {
    id: string;
    email: string;
}
type AuthResponse = {
    message: string;
    user?: UserData | null;
    success: boolean;
}

export const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<{}, AxiosResponse<AuthResponse>>("/api/users/login", { email, password });
        const { user, success, message } = response.data;

        // login failed, send the data to process by React.Context
        if (!success) {
            return { success: false, user: null, message };
        }

        return { success: true, user, message }
    } catch (error: unknown) {
        console.log(error);
        return { success: false, user: null, message: "Unhandled error" };
    }
};


export const handleLogout = async (): Promise<AuthResponse> => {
    try {
        const response = await axios.delete<{}, AxiosResponse<AuthResponse>>("api/users/logout");
        const { success, message } = response.data;

        if (!success) {
            return { success: false, message };
        }

        return { success: true, user: null, message }
    } catch (error) {
        return { success: false, message: "Logout error" };
    }
};