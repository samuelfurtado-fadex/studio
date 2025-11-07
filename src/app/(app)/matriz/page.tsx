'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Info, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";

type SupplyInfo = {
    count: number;
    value: number;
};

type SearchResult = {
    project: Project;
    openSupplies: SupplyInfo;
    overdueSupplies: SupplyInfo;
};

const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default function MatrizPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        const project = projects.find(p => p.code.toLowerCase() === searchQuery.toLowerCase());
        setSearched(true);
        if (project) {
            // Mock data for supplies
            const openSupplies = {
                count: project.openSupplies,
                value: project.openSupplies * (project.code === 'PROJ-005' ? 450 : 250.75), // Mock value
            };
            const overdueSupplies = {
                count: project.code === 'PROJ-005' ? 2 : 0,
                value: project.code === 'PROJ-005' ? 1250.00 : 0,
            };
            setSearchResult({ project, openSupplies, overdueSupplies });
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
      <Card className="mb-6 max-w-3xl mx-auto">
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
        <Card className="max-w-3xl mx-auto mt-6">
             <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Resultado da Análise</CardTitle>
                 {searchResult && (
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/projetos/${searchResult.project.id}`}>
                            Ver Detalhes do Projeto <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
             </CardHeader>
             <CardContent>
                {searchResult ? (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 mb-6">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Nome do Projeto</p>
                                <p className="font-semibold">{searchResult.project.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Código do Projeto</p>
                                <p className="font-semibold">{searchResult.project.code}</p>
                            </div>
                            <div className="space-y-1 col-span-full">
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
                        </div>

                        <div className="space-y-4">
                            {/* Open Supplies */}
                            <div className="rounded-lg border bg-green-50/50">
                                <h4 className="font-semibold p-3 border-b bg-green-100/60 rounded-t-lg text-green-900">Suprimento em Aberto</h4>
                                <div className="p-3 grid grid-cols-[120px_1fr] items-center">
                                    <div className="font-medium text-sm text-green-800 bg-green-200/60 p-2 rounded-l-md h-full flex items-center">Quantidade</div>
                                    <div className="p-2 border-t border-r border-b rounded-r-md">{searchResult.openSupplies.count} itens</div>
                                    <div className="font-medium text-sm text-green-800 bg-green-200/60 p-2 rounded-l-md h-full flex items-center border-t">Valor</div>
                                    <div className="p-2 border-r border-b rounded-r-md">{formatCurrency(searchResult.openSupplies.value)}</div>
                                </div>
                            </div>

                            {/* Overdue Supplies */}
                             <div className="rounded-lg border bg-yellow-50/50">
                                <h4 className="font-semibold p-3 border-b bg-yellow-100/60 rounded-t-lg text-yellow-900">Suprimento mais de 45 dias</h4>
                                <div className="p-3 grid grid-cols-[120px_1fr] items-center">
                                    <div className="font-medium text-sm text-yellow-800 bg-yellow-200/60 p-2 rounded-l-md h-full flex items-center">Quantidade</div>
                                    <div className="p-2 border-t border-r border-b rounded-r-md">{searchResult.overdueSupplies.count} itens</div>
                                    <div className="font-medium text-sm text-yellow-800 bg-yellow-200/60 p-2 rounded-l-md h-full flex items-center border-t">Valor</div>
                                    <div className={`p-2 border-r border-b rounded-r-md ${searchResult.overdueSupplies.value > 0 ? 'text-destructive' : ''}`}>{formatCurrency(searchResult.overdueSupplies.value)}</div>
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
