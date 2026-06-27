'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Heart, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserFavoritesPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in');
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;
  }

  const favorites = [
    { id: 1, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', rating: 4.9, price: '$250/night' },
    { id: 2, name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1537956965359-0e5b7f15b9f6?w=400&q=80', rating: 4.8, price: '$320/night' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar role="user" />
        <main className="flex-1 p-6 lg:p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Favorite Destinations</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500">
                      <Heart className="h-5 w-5 fill-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link href={`/destinations/${item.id}`} className="flex-1">
                        <Button className="w-full">View Details</Button>
                      </Link>
                      <Button variant="outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
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