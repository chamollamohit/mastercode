"use client";

import { axiosInstance } from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    role: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get("/auth/authUser");
            setUser(res.data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, setUser, isCheckingAuth, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)!;
};
