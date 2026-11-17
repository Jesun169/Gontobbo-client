import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { Destination } from "@/types/destination";

interface Pagination {
  page: number;
  total: number;
  totalPages: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function useDestinations(filters: Record<string, any> = {}) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    total: 0,
    totalPages: 1,
  });

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/destinations`, {
        params: filters,
      });

      const mapped: Destination[] = (response.data.destinations || []).map((d: any) => ({
        id: d._id ?? d.id,
        name: d.name,
        location: `${d.location.city}, ${d.location.country}`,
        image: d.images?.[0] || undefined,
        guests: d.rating?.count ?? 0,
      }));

      setDestinations(mapped);
      setPagination(
        response.data.pagination || { page: 1, total: 0, totalPages: 1 }
      );
    } catch (err) {
      setError("Failed to load destinations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return { destinations, loading, error, pagination, refetch: fetchDestinations };
}