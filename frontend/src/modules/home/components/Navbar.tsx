"use client";

import Link from "next/link";
import { useAuth } from "@/components/provider/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogOut, User, Layers2, DatabaseZap } from "lucide-react";
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
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, checkAuth } = useAuth();

    const onLogout = async () => {
        await api.post("/auth/logout");
        await checkAuth();
        router.push("/");
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Problems", href: "/problems" },
    ];

    return (
        <div className="w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[16px_16px] py-6">
            <header className="container mx-auto px-4 max-w-7xl">
                <nav className="h-20 px-8 flex items-center justify-between bg-background/80 backdrop-blur-md border border-border/50 rounded-[2rem] shadow-sm">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group">
                        <div className="flex items-center gap-2 text-primary">
                            <DatabaseZap />
                            <span className="text-2xl font-black tracking-tight font-man">
                                Master
                                <span className="text-foreground">Code</span>
                            </span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-semibold transition-colors hover:text-primary tracking-wide",
                                    pathname === link.href
                                        ? "text-foreground"
                                        : "text-muted-foreground",
                                )}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-10 w-10 rounded-full border border-border/40 p-0 overflow-hidden">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-amber-500/10 text-amber-600 font-man font-black uppercase">
                                                {user.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 rounded-[1.5rem] p-2 mt-2">
                                    <DropdownMenuLabel className="px-4 py-3 font-man">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-black uppercase tracking-tighter leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        asChild
                                        className="rounded-xl cursor-pointer">
                                        <Link href="/profile">
                                            <User className="mr-2 h-4 w-4" />{" "}
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    {user.role === "ADMIN" && (
                                        <DropdownMenuItem
                                            asChild
                                            className="rounded-xl cursor-pointer">
                                            <Link href="/create-problem">
                                                <Layers2 className="mr-2 h-4 w-4" />{" "}
                                                Create Problem
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="rounded-xl text-destructive focus:bg-destructive/10 cursor-pointer"
                                        onClick={onLogout}>
                                        <LogOut className="mr-2 h-4 w-4" /> Log
                                        out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="font-bold text-xs uppercase tracking-widest">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button
                                    asChild
                                    className="rounded-xl font-black text-xs uppercase tracking-widest px-6 shadow-lg bg-foreground text-background hover:bg-foreground/90">
                                    <Link href="/register">Sign Up</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
