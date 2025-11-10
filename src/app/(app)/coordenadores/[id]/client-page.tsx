
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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 448 512" {...props}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.8-16.2-54.3-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);


export default function CoordinatorProfileClientPage({ coordinator }: { coordinator: Coordinator }) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [status, setStatus] = useState(coordinator.prestacaoContasStatus);
  const [isIncorrectDataOpen, setIncorrectDataOpen] = useState(false);

  const coordinatorProjects = projects.filter(p => p.coordinatorId === coordinator.id);
  const coordinatorDebts = debts.filter(d => d.coordinatorName === coordinator.name);
  const avatarImage = PlaceHolderImages.find(img => img.id === coordinator.avatar);

  const whatsappMessage = encodeURIComponent(`Olá ${coordinator.name}, há pendências financeiras em seu nome. Por favor, verifique a plataforma.`);
  const emailSubject = encodeURIComponent(`Notificação de Pendência Financeira`);
  const emailBody = encodeURIComponent(`Prezado(a) ${coordinator.name},\n\nConstatamos que há pendências financeiras associadas ao seu perfil em nossa plataforma. \n\nPor favor, acesse o sistema para mais detalhes e regularização.\n\nAtenciosamente,\nEquipe Financeira FADEX`);
  const phoneNumber = coordinator.phone.replace(/\D/g, '');
  
  const handleDownload = () => {
    if (!coordinator.hasDocument) {
      toast({
        variant: "destructive",
        title: "Erro ao baixar",
        description: "Nenhum documento anexado por este coordenador.",
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Send className="mr-2 h-4 w-4" /> Enviar Notificação
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Enviar Notificação</DialogTitle>
                      <DialogDescription>
                        Escolha o canal para notificar o coordenador sobre suas pendências financeiras.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <Button variant="outline" asChild className="h-12 justify-start gap-4 px-4 text-base transition-all hover:bg-emerald-500 hover:text-white hover:scale-105">
                           <Link href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`} target="_blank">
                                <WhatsAppIcon className="h-6 w-6" /> WhatsApp
                           </Link>
                        </Button>
                         <Button variant="outline" asChild className="h-12 justify-start gap-4 px-4 text-base transition-all hover:bg-blue-500 hover:text-white hover:scale-105">
                            <Link href={`mailto:${coordinator.email}?subject=${emailSubject}&body=${emailBody}`}>
                                <Mail className="h-6 w-6" /> E-mail
                            </Link>
                        </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                    <Button variant="outline" onClick={handleDownload} disabled={isDownloading || status === 'Em Aberto'}>
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

    