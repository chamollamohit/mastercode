"use client";

import Link from "next/link";
import { useAuth } from "@/components/provider/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Code, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/axios-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const { user, isCheckingAuth, checkAuth } = useAuth();
    const onLogout = async () => {
        await api.post("/auth/logout");
        await checkAuth();
        router.push("/");
    };
    console.log(isCheckingAuth, user);

    return (
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 font-mont">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 group">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Code className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight font-man">
                        Master<span className="text-primary">Code</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {isCheckingAuth ? (
                        <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary/10 text-primary font-man font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 font-mont">
                                <DropdownMenuLabel className="font-man">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none">
                                            {user.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/dashboard"
                                        className="cursor-pointer">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile"
                                        className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:bg-destructive/10 cursor-pointer"
                                    onClick={onLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                asChild
                                className="font-man font-semibold">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                className="font-man font-bold shadow-md">
                                <Link href="/register">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
