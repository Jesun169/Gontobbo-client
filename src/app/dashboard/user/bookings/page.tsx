"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

export default function UserBookingsPage() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const userId = user.id; // ✅ FIX: capture safe non-null value

    async function fetchBookings() {
      try {
        const res = await fetch(`/api/bookings?userId=${userId}`); // TS-safe
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      }
    }

    fetchBookings();
  }, [isLoaded, user]);

  if (!isLoaded || !user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-muted-foreground">You have no bookings yet.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking: any) => (
          <Card key={booking.id}>
            <CardHeader>
              <CardTitle>{booking.destinationName}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {booking.startDate} → {booking.endDate}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{booking.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{booking.guests} guests</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
