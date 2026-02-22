import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Auth",
    description:
        "Sign in or create an account to start solving coding challenges and master your algorithms.",
    openGraph: {
        title: "Join CodeMaster",
        description: "The ultimate platform for competitive programming.",
    },
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-background">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:bg-slate-950 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20" />

            <section className="flex min-h-screen items-center justify-center">
                <div className="w-full h-full">{children}</div>
            </section>
        </main>
    );
}
