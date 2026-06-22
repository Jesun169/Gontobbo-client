"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Script from "next/script";

type ThemeProviderProps = {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    themes?: string[];
    forcedTheme?: string;
    enableColorScheme?: boolean;
    value?: {
        light: string;
        dark: string;
    };
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <>
            <Script id="theme-script" strategy="beforeInteractive">
                {`
                    try {
                        let theme = localStorage.getItem('theme');
                        if (!theme) {
                            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                        }
                        document.documentElement.classList.add(theme);
                    } catch (e) {}
                `}
            </Script>
            <NextThemesProvider {...props}>
                {children}
            </NextThemesProvider>
        </>
    );
}