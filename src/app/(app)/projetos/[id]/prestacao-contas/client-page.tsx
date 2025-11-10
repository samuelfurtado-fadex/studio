'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type Project } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Paperclip, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default function PrestacaoContasClientPage({ project }: { project: Project }) {
    const { toast } = useToast();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState("Em Aberto");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
            toast({
                title: "Arquivo selecionado",
                description: event.target.files[0].name,
            });
        }
    };
    
    const triggerFileInput = () => {
        document.getElementById('file-upload')?.click();
    };

    const handleStatusClick = (newStatus: string) => {
        if (!uploadedFile) {
            toast({
                variant: "destructive",
                title: "Nenhum arquivo anexado",
                description: "Por favor, anexe um documento antes de alterar o status.",
            });
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setStatus(newStatus);
            toast({
                title: "Status Atualizado",
                description: `O status da prestação de contas foi alterado para: "${newStatus}"`,
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const daysRemaining = 5; // Mock data

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
                            <p className="text-lg font-bold">{status}</p>
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
                        <CardTitle className="text-xl">Você irá ou já foi:</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center gap-4">
                        <Button 
                            className="w-full md:w-auto flex-1 h-20 text-lg bg-primary hover:bg-primary/90"
                            onClick={() => handleStatusClick('Enviada por E-mail')}
                            disabled={isSubmitting}
                        >
                            Foi enviado por e-mail
                        </Button>
                        <div className="w-full md:w-auto flex-1 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-20">
                            <div className="flex items-center justify-center w-full">
                                <Button variant="ghost" size="sm" onClick={triggerFileInput}>
                                    <Upload className="mr-2 h-4 w-4" /> Adicionar
                                </Button>
                                <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                            </div>
                            {uploadedFile && (
                                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                                    <Paperclip className="h-4 w-4 mr-2" /> 
                                    {uploadedFile.name}
                                </p>
                            )}
                             {!uploadedFile && (
                                <p className="text-xs text-muted-foreground mt-2">
                                    Anexe o documento da prestação.
                                </p>
                            )}
                        </div>
                        <Button 
                            className="w-full md:w-auto flex-1 h-20 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            onClick={() => handleStatusClick('Entregue na recepção')}
                            disabled={isSubmitting}
                        >
                            Foi entregue na recepção
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
