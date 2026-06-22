export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'manager' | 'admin';
    profileImage?: string;
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        country?: string;
        postalCode?: string;
    };
    preferences: {
        currency: string;
        language: string;
        notifications: boolean;
        newsletter: boolean;
    };
}

export interface Destination {
    id: string;
    name: string;
    slug: string;
    location: {
        city: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    images: string[];
    description: string;
    shortDescription: string;
    highlights: string[];
    price: {
        currency: string;
        amount: number;
        per: 'night' | 'day' | 'person' | 'trip';
    };
    rating: {
        average: number;
        count: number;
    };
    amenities: string[];
    bestTimeToVisit: string;
    category: string[];
    itinerary: {
        day: number;
        title: string;
        activities: string[];
        meals: string[];
    }[];
}

export interface Booking {
    id: string;
    user: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    guests: number;
    totalPrice: number;
    currency: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    specialRequests?: string;
}

export interface Review {
    id: string;
    user: string;
    destination: string;
    rating: number;
    comment: string;
    images?: string[];
    createdAt: Date;
}