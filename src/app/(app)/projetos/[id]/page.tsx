import { notFound } from "next/navigation";
import Link from 'next/link';
import { projects, coordinators } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ClipboardList, PlusCircle, CheckCircle, XCircle, Users, Wallet, FileText } from "lucide-react";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};


export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }
  
  const coordinator = coordinators.find(c => c.id === project.coordinatorId);
  const coordinatorImage = coordinator ? PlaceHolderImages.find(img => img.id === coordinator.avatar) : null;


  const statusVariant = project.status === 'Ativo' ? 'default' : project.status === 'Concluído' ? 'secondary' : 'destructive';
  const colorClass = project.status === 'Ativo' ? 'bg-green-500' : project.status === 'Concluído' ? 'bg-blue-500' : 'bg-yellow-500';
  
  const budgetPercentage = (project.budget.current / project.budget.total) * 100;
  const availableBalance = project.budget.total - project.budget.current;


  return (
    <>
      <PageHeader title={project.name}>
        <Button asChild>
          <Link href={`/projetos/${project.id}/prestacao-contas`}>
              <FileText className="mr-2 h-4 w-4" />
              Prestação de Contas
          </Link>
        </Button>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Projeto</CardTitle>
                <CardDescription>Informações gerais e status atual do projeto.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Código do Projeto</span>
                    <span className="font-semibold">{project.code}</span>
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
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wallet /> Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                            <span>Gasto</span>
                            <span>{formatCurrency(project.budget.current)}</span>
                        </div>
                        <Progress value={budgetPercentage} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                             <span>Total</span>
                            <span>{formatCurrency(project.budget.total)}</span>
                        </div>
                    </div>
                    <Separator/>
                     <div className="flex justify-between items-center">
                        <span className="font-medium">Saldo Disponível</span>
                        <span className="font-bold text-lg text-emerald-600">{formatCurrency(availableBalance)}</span>
                    </div>
                </CardContent>
            </Card>
            {coordinator && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users /> Equipe</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Coordenador</p>
                            <Link href={`/coordenadores/${coordinator.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
                                <Avatar className="h-10 w-10">
                                    {coordinatorImage && <AvatarImage src={coordinatorImage.imageUrl} alt={coordinator.name} data-ai-hint={coordinatorImage.imageHint} />}
                                    <AvatarFallback>{coordinator.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{coordinator.name}</p>
                                    <p className="text-xs text-muted-foreground">{coordinator.email}</p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Dupla de Colaboradores</p>
                            <div className="flex gap-2 mt-2">
                                <Badge variant="secondary">Ana Silva</Badge>
                                <Badge variant="secondary">Bruno Costa</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </>
  );
}
