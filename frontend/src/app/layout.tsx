import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/provider/auth-provider";
import { ThemeWrapper } from "@/components/provider/nextTheme";
import { currentUser } from "@/modules/auth/actions";

const manRope = Manrope({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-manrope",
    display: "swap",
});

const montSerrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Master Code | Your Coding Buddy",
        template: "%s | Master Code",
    },
    description:
        "Master algorithms, solve coding challenges, and track your progress with Master Code-the ultimate platform for developers.",
    keywords: [
        "coding",
        "algorithms",
        "leetcode clone",
        "programming",
        "master code",
    ],
    authors: [{ name: "Mohit" }],
    creator: "Mohit",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();

    return (
        <html
            lang="en"
            suppressHydrationWarning>
            <head>
                <script
                    async
                    crossOrigin="anonymous"
                    src="https://tweakcn.com/live-preview.min.js"
                />
            </head>

            <body
                className={`${manRope.variable} ${montSerrat.variable} font-man antialiased min-h-screen bg-background`}>
                <ThemeWrapper>
                    <AuthProvider initialUser={user}>{children}</AuthProvider>
                </ThemeWrapper>
                <Toaster position="top-center" />
            </body>
        </html>
    );
}
