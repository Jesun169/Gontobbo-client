"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DestinationCard } from "@/components/destinations/DestinationCard";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X } from "lucide-react";
import { useDestinations } from "@/hooks/useDestinations";
import { useDebounce } from "@/hooks/useDebounce";
import { Pagination } from "@/components/ui/pagination";

export default function DestinationsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const debouncedSearch = useDebounce(search, 500);

  const { destinations, loading, pagination } = useDestinations({
    search: debouncedSearch,
    location,
    sort,
    page,
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (location) params.set("location", location);
    if (sort) params.set("sort", sort);
    if (page > 1) params.set("page", String(page));

    router.replace(`/destinations?${params.toString()}`);
  }, [debouncedSearch, location, sort, page, router]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setSort("latest");
    setPage(1);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-4 items-center">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Nepal">Nepal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* Destination Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <DestinationCard key={i} isLoading />
              ))}
            </div>
          ) : destinations.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">
              No destinations found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination?.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
