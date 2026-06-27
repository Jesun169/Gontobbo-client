import { Suspense } from "react";
import DestinationsPageClient from "./page.client";

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DestinationsPageClient />
    </Suspense>
  );
}
