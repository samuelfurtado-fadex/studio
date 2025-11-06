import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, PlusCircle, CheckCircle, XCircle } from "lucide-react";

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const statusVariant = project.status === 'Ativo' ? 'default' : project.status === 'Concluído' ? 'secondary' : 'destructive';
  const colorClass = project.status === 'Ativo' ? 'bg-green-500' : project.status === 'Concluído' ? 'bg-blue-500' : 'bg-yellow-500';


  return (
    <>
      <PageHeader title={project.name} />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Projeto</CardTitle>
            <CardDescription>Informações gerais e status atual do projeto.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Código do Projeto</span>
                <span className="font-semibold">{project.code}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Coordenador</span>
                <span className="font-semibold">{project.coordinator}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Rubrica Orçamentária</span>
                <span className="font-semibold">{project.budgetHead}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <Badge variant={statusVariant} className={`w-fit text-white ${colorClass}`}>{project.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardList /> Suprimentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                    <p className="font-medium">Suprimentos em Aberto</p>
                    <p className="text-sm text-muted-foreground">Pedidos de suprimento pendentes de aprovação.</p>
                </div>
                <p className="text-2xl font-bold">{project.openSupplies}</p>
             </div>
             <Separator />
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Novo Suprimento</p>
                  <p className="text-sm text-muted-foreground">Verifica se o projeto está habilitado para novos pedidos.</p>
                </div>
                <div className="flex items-center gap-2">
                    {project.canCreateNewSupply ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className={`font-semibold ${project.canCreateNewSupply ? 'text-green-600' : 'text-destructive'}`}>
                        {project.canCreateNewSupply ? 'Permitido' : 'Não Permitido'}
                    </span>
                </div>
             </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Criar Novo Suprimento
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
