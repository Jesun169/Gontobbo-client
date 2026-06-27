"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {user?.fullName}</p>
            <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </>
  );
}
