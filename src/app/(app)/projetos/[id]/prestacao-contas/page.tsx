import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import PrestacaoContasClientPage from "./client-page";

export default function PrestacaoContasPage({ params }: { params: { id: string } }) {
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        notFound();
    }

    return <PrestacaoContasClientPage project={project} />;
}
