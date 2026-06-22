"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star, MapPin, DollarSign, Plane, Compass, Users, Award } from "lucide-react";

export default function UserDashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, {user?.firstName || user?.username || "Traveler"}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's an overview of your travel activity and personalized recommendations.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-green-600">+2 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Favorite Destinations</CardTitle>
                <Star className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 new added</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Destinations Visited</CardTitle>
                <MapPin className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 planned trips</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,250</div>
                <p className="text-xs text-green-600">+$850 this year</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Next Adventure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <Plane className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Bali, Indonesia</p>
                    <p className="text-sm text-muted-foreground">December 15-22, 2024</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-yellow-500">★★★★★</span>
                      <span className="text-xs text-muted-foreground">(4.9)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">Beach</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">Adventure</span>
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">Culture</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                    <Compass className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">You might like: Santorini</p>
                      <p className="text-xs text-muted-foreground">Based on your beach preferences</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Group trips available</p>
                      <p className="text-xs text-muted-foreground">Join fellow travelers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Best time to visit</p>
                      <p className="text-xs text-muted-foreground">Spring is ideal for your next trip</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { destination: "Bali, Indonesia", date: "Dec 15-22, 2024", status: "Confirmed", price: "$1,250" },
                  { destination: "Paris, France", date: "Jan 10-17, 2025", status: "Pending", price: "$2,100" },
                  { destination: "Tokyo, Japan", date: "Mar 5-12, 2025", status: "Planned", price: "$3,450" },
                ].map((booking, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Plane className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.destination}</p>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{booking.price}</p>
                      <p className={`text-sm ${booking.status === "Confirmed" ? "text-green-600" :
                          booking.status === "Pending" ? "text-yellow-600" :
                            "text-blue-600"
                        }`}>
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}