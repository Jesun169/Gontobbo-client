'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Calendar, Users, CheckCircle, AlertCircle, XCircle, Plane } from 'lucide-react';

export default function UserBookingsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in');
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;
  }

  const bookings = [
    { id: 1, destination: 'Bali, Indonesia', dates: 'Dec 15-22, 2024', status: 'Confirmed', guests: 2, price: '$1,250' },
    { id: 2, destination: 'Paris, France', dates: 'Jan 10-17, 2025', status: 'Pending', guests: 1, price: '$2,100' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar role="user" />
        <main className="flex-1 p-6 lg:p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">My Bookings</h1>
                <p className="text-muted-foreground mt-1">Manage your travel bookings</p>
              </div>
              <Button><Plane className="mr-2 h-4 w-4" />New Booking</Button>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">🏝️</div>
                        <div>
                          <h3 className="text-lg font-semibold">{booking.destination}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" /> <span>{booking.dates}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" /> <span>{booking.guests} guests</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <div className="flex items-center gap-2">
                          {booking.status === 'Confirmed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {booking.status === 'Pending' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                          <span className={`font-medium ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xl font-bold">{booking.price}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {booking.status === 'Confirmed' && (
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Cancel</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}