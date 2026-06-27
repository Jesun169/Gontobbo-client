import { useState, useEffect } from "react";
import axios from "axios";
import type { Destination } from "@/types/destination";   // ⭐ shared type

interface Pagination {
  page: number;
  total: number;
  totalPages: number;
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
        const response = await axios.get("/api/destinations", {
          params: filters,
        });

        const mapped: Destination[] = (response.data.destinations || []).map((d: any) => ({
          id: d.id,
          name: d.name,
          location: `${d.location.city}, ${d.location.country}`,
          image: d.images?.[0] || undefined,
          guests: d.rating?.count || 0,
        }));

        setDestinations(mapped);

        setPagination(
          response.data.pagination || {
            page: 1,
            total: 0,
            totalPages: 1,
          }
        );
      } catch (err) {
        setError("Failed to load destinations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [JSON.stringify(filters)]);

  return { destinations, loading, error, pagination, refetch: () => {} };
}
