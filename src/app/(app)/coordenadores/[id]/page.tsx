import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, User, Briefcase, DollarSign, History, Send } from "lucide-react";

import { coordinators, projects, debts } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default function CoordinatorProfilePage({ params }: { params: { id: string } }) {
  const coordinator = coordinators.find((c) => c.id === params.id);

  if (!coordinator) {
    notFound();
  }

  const coordinatorProjects = projects.filter(p => p.coordinatorId === coordinator.id);
  const coordinatorDebts = debts.filter(d => d.coordinatorName === coordinator.name);
  const avatarImage = PlaceHolderImages.find(img => img.id === coordinator.avatar);

  return (
    <>
      <PageHeader title="Perfil do Coordenador" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={coordinator.name} data-ai-hint={avatarImage.imageHint} />}
                <AvatarFallback>{coordinator.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{coordinator.name}</h2>
              <p className="text-sm text-muted-foreground">{coordinator.project}</p>
              <Separator className="my-4" />
              <div className="w-full text-left space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{coordinator.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{coordinator.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">CPF: {coordinator.cpf}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5" /> Situação Financeira</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <p className="text-sm text-muted-foreground">Saldo Pendente</p>
                    <p className="text-lg font-bold text-destructive">{formatCurrency(coordinator.pendingBalance)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Saldo Disponível</p>
                    <p className="text-lg font-bold text-emerald-600">{formatCurrency(coordinator.availableBalance)}</p>
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Enviar Notificação
                </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5"/> Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {coordinatorProjects.map(p => (
                    <li key={p.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                        <div>
                            <p className="font-medium">{p.name} ({p.code})</p>
                            <p className="text-sm text-muted-foreground">Status: {p.status}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.status === 'Ativo' ? 'bg-green-100 text-green-800' : p.status === 'Concluído' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span>
                    </li>
                ))}
              </ul>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><History className="w-5 h-5"/> Histórico de Movimentações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coordinatorDebts.map(debt => (
                  <div key={debt.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dívida - {debt.projectName}</p>
                      <p className="text-sm text-muted-foreground">Vencimento: {debt.dueDate.toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${debt.status === 'Pendente' ? 'text-destructive' : 'text-green-600'}`}>{formatCurrency(debt.value)}</p>
                      <p className={`text-sm ${debt.status === 'Pendente' ? 'text-destructive' : 'text-green-600'}`}>{debt.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
