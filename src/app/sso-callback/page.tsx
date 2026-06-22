"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to dashboard after SSO callback
        router.push("/dashboard/user");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Completing sign in...</p>
            </div>
        </div>
    );
}