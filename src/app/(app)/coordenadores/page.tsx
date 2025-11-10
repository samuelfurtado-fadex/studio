
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-coordenadores";
import { coordinators } from "@/lib/data";

export default function CoordenadoresPage() {
  return (
    <>
      <PageHeader title="Coordenadores" />
      <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
        <DataTable columns={columns} data={coordinators} />
      </div>
    </>
  );
}
