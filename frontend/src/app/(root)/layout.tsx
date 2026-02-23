import type { Metadata } from "next";
import React from "react";
import Navbar from "@/modules/home/components/Navbar";

export const metadata: Metadata = {
    description:
        "Join 10,000+ developers sharpening their skills with real-time feedback, curated problems, and an interactive coding environment.",
    keywords: [
        "coding",
        "programming",
        "algorithms",
        "data structures",
        "tech interview",
        "software engineering",
    ],
    authors: [{ name: "Mohit Chamolla" }],
    openGraph: {
        title: "MasterCode | Elevate Your Coding Skills",
        description:
            "The ultimate platform for mastering algorithms and data structures.",
        url: "https://mastercode.com",
        siteName: "MasterCode",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MasterCode",
        description:
            "Prepare for your next big engineering role with MasterCode.",
    },
    icons: {
        icon: "/favicon.ico",
    },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex flex-col px-4 pb-4 relative">
                <div
                    className="absolute inset-0 -z-10 h-full w-full bg-background 
          bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] 
          dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] 
          bg-size-[24px_24px] 
          mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"
                />

                {children}
            </div>
        </main>
    );
};

export default RootLayout;
