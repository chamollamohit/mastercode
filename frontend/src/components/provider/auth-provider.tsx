"use client";

import { api } from "@/lib/axios-client";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    createdAt: Date;
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

export function AuthProvider({
    children,
    initialUser,
}: {
    children: React.ReactNode;
    initialUser: User | null;
}) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [isCheckingAuth, setIsCheckingAuth] = useState(!initialUser);

    const checkAuth = async () => {
        try {
            const res = await api.get("/auth/authUser");
            setUser(res.data.data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    useEffect(() => {
        if (!initialUser) checkAuth();
    }, [initialUser]);

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
