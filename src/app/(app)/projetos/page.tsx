import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-projetos";
import { projects } from "@/lib/data";
import { Search } from "lucide-react";

export default function ProjetosPage() {
  return (
    <>
      <PageHeader title="Projetos">
         <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar por nome, código..."
            className="pl-8 sm:w-[300px]"
          />
        </div>
      </PageHeader>
      <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
        <DataTable columns={columns} data={projects} />
      </div>
    </>
  );
}
