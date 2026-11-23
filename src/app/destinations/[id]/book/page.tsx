'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { ArrowLeft, Calendar, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function BookDestinationPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { getToken, isSignedIn } = useAuth();

    const [dest, setDest] = useState<any>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [specialRequests, setSpecialRequests] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        axios
            .get(`${API_URL}/destinations/${id}`)
            .then((r) => setDest(r.data))
            .catch(() => setError('Could not load destination'));
    }, [id]);

    const nights =
        startDate && endDate
            ? Math.max(
                1,
                Math.ceil(
                    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
                )
            )
            : 0;

    const total = dest && nights ? dest.price.amount * nights * guests : 0;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const token = await getToken();
            if (!token) {
                throw new Error('Please sign in to book.');
            }
            await axios.post(
                `${API_URL}/bookings`,
                { destinationId: id, startDate, endDate, guests, specialRequests },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push('/dashboard/user/bookings');
        } catch (err: any) {
            setError(
                err.response?.data?.error ||
                err.message ||
                'Booking failed. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!dest && !error) return <div className="p-8">Loading…</div>;
    if (error && !dest) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        Gontobbo
                    </Link>
                    <Link href={`/destinations/${id}`}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Book: {dest.name}</CardTitle>
                        <p className="text-muted-foreground">
                            {dest.location.city}, {dest.location.country}
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="startDate">Check-in</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="endDate">Check-out</Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="guests" className="flex items-center gap-2">
                                    <UsersIcon className="h-4 w-4" /> Guests
                                </Label>
                                <Input
                                    id="guests"
                                    type="number"
                                    min={1}
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="specialRequests">Special Requests</Label>
                                <Textarea
                                    id="specialRequests"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    placeholder="Any dietary needs, accessibility requests, etc."
                                />
                            </div>

                            {nights > 0 && (
                                <div className="rounded-lg bg-muted p-4 text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span>
                                            {dest.price.currency} {dest.price.amount} × {nights} night
                                            {nights > 1 ? 's' : ''}
                                        </span>
                                        <span>
                                            {dest.price.currency}{' '}
                                            {(dest.price.amount * nights).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Guests</span>
                                        <span>× {guests}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 mt-2 font-semibold text-base">
                                        <span>Total</span>
                                        <span>
                                            {dest.price.currency} {total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {!isSignedIn && (
                                <p className="text-sm text-amber-600">
                                    You need to sign in before booking.
                                </p>
                            )}

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <Button
                                type="submit"
                                disabled={submitting || !isSignedIn}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                size="lg"
                            >
                                <Calendar className="h-4 w-4 mr-2" />
                                {submitting ? 'Booking…' : 'Confirm Booking'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}