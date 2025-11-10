
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type Project } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Paperclip, ArrowLeft, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default function PrestacaoContasClientPage({ project }: { project: Project }) {
    const { toast } = useToast();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'Em Aberto' | 'Aguardando Análise' | 'Concluído'>("Em Aberto");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUploadedFile(file);
            toast({
                title: "Arquivo selecionado",
                description: file.name,
            });
        }
    };
    
    const triggerFileInput = () => {
        document.getElementById('file-upload')?.click();
    };

    const handleSubmitForAnalysis = () => {
        if (!uploadedFile) {
            toast({
                variant: "destructive",
                title: "Nenhum arquivo anexado",
                description: "Por favor, anexe um documento antes de enviar para análise.",
            });
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setStatus('Aguardando Análise');
            toast({
                title: "Documento Enviado para Análise",
                description: `O status da prestação de contas foi atualizado para "Aguardando Análise".`,
            });
            setIsSubmitting(false);
        }, 1500);
    };

    const daysRemaining = 5; // Mock data

    const getStatusVariant = () => {
        switch (status) {
            case 'Em Aberto':
                return 'destructive';
            case 'Aguardando Análise':
                return 'default';
            case 'Concluído':
                return 'default';
            default:
                return 'secondary';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'Em Aberto':
                return 'bg-yellow-500 text-white';
            case 'Aguardando Análise':
                return 'bg-blue-500 text-white';
            case 'Concluído':
                return 'bg-green-600 text-white';
            default:
                return '';
        }
    }

    return (
        <>
            <PageHeader title="Prestação de Contas">
                 <Button asChild variant="outline">
                    <Link href={`/projetos/${project.id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar ao Projeto
                    </Link>
                </Button>
            </PageHeader>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant={getStatusVariant()} className={getStatusColor()}>
                                {status}
                             </Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Dias que Faltam:</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-bold text-destructive">{daysRemaining} dias</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Valor Total da Rubrica</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-bold">{formatCurrency(project.budget.total)}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Nome do Projeto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-base font-semibold truncate" title={project.name}>{project.name}</p>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Enviar documento para análise</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center gap-4">
                       
                        <div className="w-full flex-1 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[10rem]">
                            <div className="flex items-center justify-center w-full">
                                <Button variant="ghost" size="lg" onClick={triggerFileInput} disabled={status !== 'Em Aberto'}>
                                    <Upload className="mr-2 h-5 w-5" /> Anexar Documento
                                </Button>
                                <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={status !== 'Em Aberto'} />
                            </div>
                            {uploadedFile && (
                                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                                    <Paperclip className="h-4 w-4 mr-2" /> 
                                    {uploadedFile.name}
                                </p>
                            )}
                             {!uploadedFile && (
                                <p className="text-xs text-muted-foreground mt-2">
                                    Formatos aceitos: PDF, DOCX, XLSX.
                                </p>
                            )}
                        </div>
                        <Button 
                            className="w-full md:w-auto flex-1 h-24 text-lg bg-primary hover:bg-primary/90"
                            onClick={handleSubmitForAnalysis}
                            disabled={isSubmitting || !uploadedFile || status !== 'Em Aberto'}
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                            {isSubmitting ? 'Enviando...' : 'Enviar para Análise'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
