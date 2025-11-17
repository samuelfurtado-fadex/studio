// src/app/(app)/coordenadores/page.tsx

import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-coordenadores";
import { getCoordinatorsFromDB } from "@/services/coordinatorService";
import type { Coordinator } from "@/lib/data";

export default async function CoordenadoresPage() {
  let data: Coordinator[] = [];
  let error: string | null = null;

  try {
    // Chamar o serviço diretamente do Server Component
    data = await getCoordinatorsFromDB();
  } catch (e) {
    console.error("Falha ao buscar dados dos coordenadores:", e);
    error = (e as Error).message;
  }

  return (
    <>
      <PageHeader title="Coordenadores" />
      <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
        {error ? (
          <p className="text-center text-destructive">
            Erro ao carregar dados: {error}
          </p>
        ) : !data || data.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Não há coordenadores para exibir.
          </p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}