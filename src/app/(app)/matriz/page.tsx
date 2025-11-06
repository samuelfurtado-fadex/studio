import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Download, CheckCircle, XCircle } from "lucide-react";
import { projects, coordinators } from "@/lib/data";

export default function MatrizPage() {
  // Mocking a search result for "PROJ-005"
  const project = projects.find(p => p.code === 'PROJ-005');
  const coordinator = project ? coordinators.find(c => c.id === project.coordinatorId) : null;

  return (
    <>
      <PageHeader title="Matriz de Decisão" />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Buscar Projeto</CardTitle>
          <CardDescription>Insira o código do projeto para ver sua situação financeira e tomar decisões.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Código do projeto (ex: PROJ-001)" defaultValue="PROJ-005" />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {project && coordinator && (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Resultado da Busca</CardTitle>
                    <CardDescription>Dados consolidados para o projeto {project.code}.</CardDescription>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Exportar
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Nome do Projeto</p>
                        <p className="font-semibold">{project.name}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Coordenador</p>
                        <p className="font-semibold">{project.coordinator}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Suprimentos em Aberto</p>
                        <p className="font-semibold">{project.openSupplies}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Saldo Pendente</p>
                        <p className="font-semibold text-destructive">{coordinator.pendingBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Saldo Disponível</p>
                        <p className="font-semibold text-emerald-600">{coordinator.availableBalance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Pode Criar Novo Suprimento?</p>
                        <div className="flex items-center gap-2">
                             {project.canCreateNewSupply ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                            )}
                            <p className={`font-semibold ${project.canCreateNewSupply ? 'text-green-600' : 'text-destructive'}`}>
                                {project.canCreateNewSupply ? 'Sim' : 'Não'}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}
    </>
  );
}
