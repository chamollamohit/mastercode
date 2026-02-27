"use client";

import { currentUser } from "@/modules/auth/actions";
import { createContext, useCallback, useContext, useState } from "react";

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
    // const [isCheckingAuth, setIsCheckingAuth] = useState(!initialUser);

    const checkAuth = useCallback(async () => {
        const data = await currentUser();
        setUser(data);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext)!;
};
