"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your Gontobbo account</p>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "shadow-lg border bg-card rounded-lg p-6",
                            headerTitle: "text-2xl font-bold text-foreground",
                            headerSubtitle: "text-muted-foreground",
                            socialButtonsBlockButton: "w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors",
                            formButtonPrimary: "w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors",
                            formFieldInput: "w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                            footerActionLink: "text-primary hover:underline",
                        },
                    }}
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/dashboard/user"
                    redirectUrl="/dashboard/user"
                />
            </motion.div>
        </div>
    );
}