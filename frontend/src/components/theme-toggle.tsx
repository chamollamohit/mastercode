"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNextTheme } from "@space-man/react-theme-animation";

export function ThemeToggle() {
    const { theme, toggleTheme, ref } = useNextTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full theme-toggle"
            ref={ref}
            onClick={() => toggleTheme()}>
            {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
