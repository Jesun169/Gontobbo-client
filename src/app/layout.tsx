import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gontobbo - AI-Powered Travel Platform",
    description: "Discover, plan, and book your dream travels with AI assistance",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ClerkProvider
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-lg border bg-card",
                            headerTitle: "text-2xl font-bold text-foreground",
                            headerSubtitle: "text-muted-foreground",
                            socialButtonsBlockButton: "w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors",
                            formButtonPrimary: "w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors",
                            formFieldInput: "w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                            footerActionLink: "text-primary hover:underline",
                        },
                    }}
                    // Set these to ensure proper redirects
                    signInUrl="/sign-in"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/dashboard/user"
                    afterSignUpUrl="/dashboard/user"
                    // This is important for handling the redirect
                    signInForceRedirectUrl="/dashboard/user"
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}