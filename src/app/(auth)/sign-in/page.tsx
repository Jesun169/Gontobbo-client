"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();

  // Check if user is already signed in and redirect
  useEffect(() => {
    // This will run on the client side
    const checkUser = async () => {
      try {
        // You can add logic here to check if user is already signed in
        // For now, we'll let Clerk handle it
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your Gontobbo account</p>
        </div>
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard/user"
          redirectUrl="/dashboard/user"
          signInForceRedirectUrl="/dashboard/user"
          // This ensures the redirect works properly
          fallbackRedirectUrl="/dashboard/user"
        />
      </div>
    </div>
  );
}