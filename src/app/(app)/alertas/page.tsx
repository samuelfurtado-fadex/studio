import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns-alertas";
import { debts } from "@/lib/data";

export default function AlertasPage() {
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const fifteenDaysFromNow = new Date();
  fifteenDaysFromNow.setDate(fifteenDaysFromNow.getDate() + 15);
  
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const debts7days = debts.filter(d => d.dueDate <= sevenDaysFromNow && d.status === 'Pendente');
  const debts15days = debts.filter(d => d.dueDate <= fifteenDaysFromNow && d.status === 'Pendente');
  const debts30days = debts.filter(d => d.dueDate <= thirtyDaysFromNow && d.status === 'Pendente');

  return (
    <>
      <PageHeader title="Alertas de Vencimento" />
      <Tabs defaultValue="7dias">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="7dias">Até 7 dias</TabsTrigger>
          <TabsTrigger value="15dias">Até 15 dias</TabsTrigger>
          <TabsTrigger value="30dias">Até 30 dias</TabsTrigger>
        </TabsList>
        <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
            <TabsContent value="7dias">
                <DataTable columns={columns} data={debts7days} />
            </TabsContent>
            <TabsContent value="15dias">
                <DataTable columns={columns} data={debts15days} />
            </TabsContent>
            <TabsContent value="30dias">
                <DataTable columns={columns} data={debts30days} />
            </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
