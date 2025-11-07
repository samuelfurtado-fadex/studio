'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Download, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { projects, coordinators, type Project } from "@/lib/data";

type SearchResult = {
    project: Project;
    overdueSupplies: {
        count: number;
        value: number;
    }
}

export default function MatrizPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        const project = projects.find(p => p.code.toLowerCase() === searchQuery.toLowerCase());
        setSearched(true);
        if (project) {
            // Mock data for overdue supplies
            const overdueSupplies = {
                count: project.code === 'PROJ-005' ? 2 : 0,
                value: project.code === 'PROJ-005' ? 1250.00 : 0,
            };
            setSearchResult({ project, overdueSupplies });
        } else {
            setSearchResult(null);
        }
    };


  return (
    <>
      <PageHeader title="Matriz de Decisão de Suprimentos" />
       <p className="text-sm text-muted-foreground -mt-4 mb-6">
            Consulte a viabilidade de novos suprimentos para um projeto.
        </p>
      <Card className="mb-6 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Consultar Projeto</CardTitle>
          <CardDescription>Insira o código único do projeto para obter uma análise.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Ex: PROJ-001" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Pesquisar
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <Card className="max-w-2xl mx-auto mt-6">
             <CardHeader>
                <CardTitle>Resultado da Análise</CardTitle>
             </CardHeader>
             <CardContent>
                {searchResult ? (
                    <div className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Nome do Projeto</p>
                                <p className="font-semibold">{searchResult.project.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Código do Projeto</p>
                                <p className="font-semibold">{searchResult.project.code}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Suprimentos em Aberto</p>
                                <p className="font-semibold">{searchResult.project.openSupplies}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Pode Criar Novo Suprimento?</p>
                                <div className="flex items-center gap-2">
                                    {searchResult.project.canCreateNewSupply ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-destructive" />
                                    )}
                                    <p className={`font-semibold ${searchResult.project.canCreateNewSupply ? 'text-green-600' : 'text-destructive'}`}>
                                        {searchResult.project.canCreateNewSupply ? 'Sim' : 'Não'}
                                    </p>
                                </div>
                            </div>
                             <div className="space-y-1 col-span-full">
                                <p className="text-sm font-medium text-muted-foreground">Suprimentos com mais de 45 dias de atraso</p>
                                <div className='flex gap-4'>
                                    <p className="font-semibold">{searchResult.overdueSupplies.count} itens</p>
                                    <p className="font-semibold text-destructive">{searchResult.overdueSupplies.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                                </div>
                            </div>
                        </div>
                        {!searchResult.project.canCreateNewSupply && (
                             <div className="rounded-lg border bg-destructive/10 p-4 text-sm text-destructive border-destructive/30">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Novo suprimento não é recomendado</h4>
                                        <p>
                                            O projeto possui restrições que impedem a criação de novos suprimentos. Verifique as pendências financeiras do coordenador e o saldo disponível do projeto antes de prosseguir.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                         <Info className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="font-medium">Nenhum projeto encontrado.</p>
                        <p className="text-sm text-muted-foreground">Verifique o código digitado e tente novamente.</p>
                    </div>
                )}
             </CardContent>
        </Card>
      )}
    </>
  );
}
