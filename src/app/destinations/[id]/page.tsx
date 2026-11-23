'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { ArrowLeft, MapPin, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function DestinationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [dest, setDest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_URL}/destinations/${id}`)
      .then((r) => setDest(r.data))
      .catch(() => setError('Destination not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) notFound();
  if (loading) return <div className="p-8">Loading…</div>;
  if (error || !dest) return <div className="p-8 text-red-600">{error ?? 'Not found'}</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar with home link */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gontobbo
          </Link>
          <Link href="/destinations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Destinations
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {dest.images?.[0] && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            <Image src={dest.images[0]} alt={dest.name} fill className="object-cover" />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{dest.name}</h1>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {dest.location.city}, {dest.location.country}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{dest.rating.average}</span>
              <span className="text-muted-foreground">({dest.rating.count} reviews)</span>
            </p>
          </div>

          <div className="flex flex-col items-stretch md:items-end gap-2">
            <div className="text-right">
              <span className="text-2xl font-bold">
                {dest.price.currency} {dest.price.amount}
              </span>
              <span className="text-muted-foreground"> / {dest.price.per}</span>
            </div>
            <Link href={`/destinations/${id}/book`}>
              <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About this destination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{dest.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Price</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">
                {dest.price.currency} {dest.price.amount}
                <span className="text-sm font-normal text-muted-foreground"> / {dest.price.per}</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Rating</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                {dest.rating.average}
                <span className="text-sm font-normal text-muted-foreground">
                  ({dest.rating.count} reviews)
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}