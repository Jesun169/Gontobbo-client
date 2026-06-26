import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pagination {
  page: number;
  total: number;
  totalPages: number;
}

interface Destination {
  id: string;
  name: string;
  location: { city: string; country: string };
  images: string[];
  description: string;
  price: { amount: number; currency: string; per: string };
  rating: { average: number; count: number };
  category: string[];
}

export function useDestinations(filters: Record<string, any>) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/destinations', {
          params: filters,
        });
        setDestinations(response.data.destinations || []);
        setPagination(response.data.pagination || { page: 1, total: 0, totalPages: 1 });
      } catch (err) {
        setError('Failed to load destinations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [JSON.stringify(filters)]);

  return { destinations, loading, error, pagination, refetch: () => {} };
}