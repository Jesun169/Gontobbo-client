import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Destination Details</h1>
      <p className="mt-2 text-gray-600">Showing details for ID: {id}</p>
    </div>
  );
}
