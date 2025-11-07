
import { notFound } from "next/navigation";
import { coordinators } from "@/lib/data";
import CoordinatorProfileClientPage from "./client-page";

export default function CoordinatorProfilePage({ params }: { params: { id: string } }) {
  const coordinator = coordinators.find((c) => c.id === params.id);

  if (!coordinator) {
    notFound();
  }

  return <CoordinatorProfileClientPage coordinator={coordinator} />;
}
