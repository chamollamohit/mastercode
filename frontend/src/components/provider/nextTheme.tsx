"use client";
import {
    NextThemeProvider,
    ThemeAnimationType,
} from "@space-man/react-theme-animation";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <NextThemeProvider
            animationType={ThemeAnimationType.CIRCLE}
            defaultTheme="light"
            defaultColorTheme="default"
            colorThemes={["dark", "light"]}>
            {children}
        </NextThemeProvider>
    );
}
