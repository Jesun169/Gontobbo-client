"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your Gontobbo account
          </p>
        </div>

        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard/user"
          redirectUrl="/dashboard/user"
          forceRedirectUrl="/dashboard/user"
          fallbackRedirectUrl="/dashboard/user"
        />
      </div>
    </div>
  );
}
