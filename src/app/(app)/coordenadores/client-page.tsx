

'use client';
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-coordenadores";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoordenadoresClientPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/coordenadores');
        if (!res.ok) {
          throw new Error('Failed to fetch coordinators');
        }
        const coordinators = await res.json();

        const dataWithProjects = await Promise.all(
          coordinators.map(async (c: any) => {
            const projectsRes = await fetch(`/api/coordenadores/${encodeURIComponent(c.email)}/projetos`);
            const projects = await projectsRes.json();
            return {
              id: c.email,
              name: c.email,
              email: c.email,
              project: projects.map((p: any) => p.nome_projeto).join(', ') || 'N/A',
              pendingBalance: 0, // Placeholder
              availableBalance: 0, // Placeholder
              phone: 'N/A', // Placeholder
            };
          })
        );

        setData(dataWithProjects);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="Coordenadores" />
      {loading && (
        <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      )}
      {error && <div className="text-red-500">Erro ao carregar coordenadores: {error}</div>}
      {!loading && !error && (
        <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
}
