"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";
import type { Destination } from "@/types/destination";   // ⭐ shared type

export interface DestinationCardProps {
  destination?: Destination;
  isLoading?: boolean;
}

export function DestinationCard({ destination, isLoading = false }: DestinationCardProps) {
  if (isLoading) {
    return <Card className="h-64 animate-pulse bg-muted rounded-lg" />;
  }

  if (!destination) return null;

  const { name, location, image, guests = 0 } = destination;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition rounded-lg">
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{guests} guests</span>
        </div>
      </CardContent>
    </Card>
  );
}
