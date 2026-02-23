"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Code, Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CodeBackground from "@/modules/auth/components/AuthImagePattern";
import { register } from "@/modules/auth/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/provider/auth-provider";

const registerSchema = z.object({
    email: z.email({ error: "Enter a valid email address" }),
    name: z.string().min(3, { error: "name must be at least 3 characters" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { checkAuth } = useAuth();
    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterForm) => {
        const result = await register(data);

        if (!result.success) {
            toast.error(result.message);
        }

        toast.success(result.message);
        await checkAuth();
        router.push("/");
    };
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background font-mont">
            <div className="flex flex-col justify-center items-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all shadow-sm">
                                <Code className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight mt-4 font-man">
                                Create Account
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Get started with your coding journey today
                            </p>
                        </div>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-man font-bold text-sm tracking-wider">
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="John Doe"
                                                    className="pl-10 font-mont"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="font-man text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-man font-bold text-sm tracking-wider">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    placeholder="you@example.com"
                                                    className="pl-10 font-mont"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="font-man text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-man font-bold text-sm tracking-wider">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="pl-10 pr-10 font-mont"
                                                    placeholder="••••••••"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }>
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="font-man text-xs" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full font-man font-extrabold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98] py-6"
                                disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">
                            Already have an account?{" "}
                        </span>
                        <Link
                            href="/login"
                            className="text-primary font-bold font-man hover:underline underline-offset-4">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <CodeBackground
                title={"Join the community"}
                subtitle={
                    "Build your profile, compete in contests, and level up your software engineering skills."
                }
            />
        </div>
    );
};

export default RegisterPage;
