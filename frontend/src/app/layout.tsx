import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";

const manRope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const montSerrat = Montserrat({
    variable: "--font-montserrat",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Master Code",
    description: "Your Own Coding Buddy",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${manRope.variable} ${montSerrat.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
