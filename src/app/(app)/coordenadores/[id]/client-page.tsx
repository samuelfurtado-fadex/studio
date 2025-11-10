
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, User, Briefcase, DollarSign, History, Send, FileText, Download, Loader2, Upload, CheckCircle, XCircle } from "lucide-react";

import type { Coordinator } from "@/lib/data";
import { projects, debts } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default function CoordinatorProfileClientPage({ coordinator }: { coordinator: Coordinator }) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [status, setStatus] = useState(coordinator.prestacaoContasStatus);
  const [isIncorrectDataOpen, setIncorrectDataOpen] = useState(false);

  const coordinatorProjects = projects.filter(p => p.coordinatorId === coordinator.id);
  const coordinatorDebts = debts.filter(d => d.coordinatorName === coordinator.name);
  const avatarImage = PlaceHolderImages.find(img => img.id === coordinator.avatar);

  const emailSubject = encodeURIComponent(`Notificação de Pendência Financeira`);
  const emailBody = encodeURIComponent(`Prezado(a) ${coordinator.name},\n\nConstatamos que há pendências financeiras associadas ao seu perfil em nossa plataforma. \n\nPor favor, acesse o sistema para mais detalhes e regularização.\n\nAtenciosamente,\nEquipe Financeira FADEX`);
  
  const handleDownload = () => {
    if (status === 'Em Aberto') {
      toast({
        variant: "destructive",
        title: "Nenhum documento",
        description: "Não é possível baixar, pois nenhum documento foi anexado por este coordenador.",
      });
      return;
    }

    setIsDownloading(true);
    toast({
      title: "Download iniciado",
      description: "O documento da prestação de contas está sendo baixado.",
    });

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      // In a real app, this would trigger a file download.
      // For this mock, we'll just show a success message.
       toast({
        title: "Download Concluído",
        description: "Documento baixado com sucesso.",
      });
    }, 2000);
  };
  
  const handleFinalize = () => {
    setIsFinalizing(true);
    // Simulate API call
    setTimeout(() => {
      setStatus('Concluído');
      setIsFinalizing(false);
      toast({
        title: "Prestação de Contas Finalizada",
        description: "A prestação de contas foi validada e concluída com sucesso.",
      });
    }, 1500);
  };

  const handleIncorrectDataSubmit = () => {
    // Here you would handle the submission of the form data
    setIncorrectDataOpen(false);
    toast({
        title: "Notificação Enviada",
        description: "O coordenador foi notificado sobre os dados incorretos."
    });
  }


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
                 <Button className="w-full" asChild>
                    <Link href={`mailto:${coordinator.email}?subject=${emailSubject}&body=${emailBody}`}>
                      <Send className="mr-2 h-4 w-4" /> Enviar Notificação por E-mail
                    </Link>
                </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Prestação de Contas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge 
                      variant={
                        status === 'Em Aberto' ? 'destructive' : 
                        status === 'Aguardando Análise' ? 'default' :
                        status === 'Concluído' ? 'default' :
                        'secondary'
                      }
                      className={
                        status === 'Em Aberto' ? 'bg-yellow-500 text-white' :
                        status === 'Aguardando Análise' ? 'bg-blue-500 text-white' :
                        status === 'Concluído' ? 'bg-green-600 text-white' :
                        ''
                      }
                    >
                      {status}
                    </Badge>
                </div>
                 <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" onClick={handleDownload} disabled={status === 'Em Aberto'}>
                      {isDownloading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {isDownloading ? 'Baixando...' : 'Baixar Documento'}
                    </Button>
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={handleFinalize}
                            disabled={isFinalizing || status !== 'Aguardando Análise'}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isFinalizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            {isFinalizing ? 'Aprovando...' : 'Aprovar e Finalizar'}
                        </Button>
                        <Dialog open={isIncorrectDataOpen} onOpenChange={setIncorrectDataOpen}>
                            <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  disabled={status !== 'Aguardando Análise'}
                                >
                                  <XCircle className="mr-2 h-4 w-4" /> Rejeitar (Dados Incorretos)
                                </Button>
                            </DialogTrigger>
                             <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Rejeitar Prestação de Contas</DialogTitle>
                                    <DialogDescription>
                                        Descreva o motivo da rejeição. O coordenador será notificado para corrigir e reenviar.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <Textarea
                                        placeholder="Detalhe aqui os erros encontrados..."
                                        rows={5}
                                    />
                                    <div>
                                        <label htmlFor="file-upload-error" className="text-sm font-medium text-muted-foreground">Anexar arquivo de referência (opcional)</label>
                                        <Input id="file-upload-error" type="file" className="mt-1 h-auto file:bg-primary file:text-primary-foreground file:hover:bg-primary/90 file:font-semibold file:py-2 file:px-4 file:rounded-md file:border-0 file:mr-4" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="ghost" onClick={() => setIncorrectDataOpen(false)}>Cancelar</Button>
                                    <Button type="submit" onClick={handleIncorrectDataSubmit}>Enviar Notificação</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
          </Card>
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
