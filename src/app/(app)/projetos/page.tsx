
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const statusConfig: { [key: string]: { class: string; text: string } } = {
  Ativo: { class: 'bg-green-500', text: 'Ativo' },
  Concluído: { class: 'bg-blue-500', text: 'Concluído' },
  'Em Pausa': { class: 'bg-yellow-500', text: 'Em Pausa' },
};

const ITEMS_PER_PAGE = 6;

export default function ProjetosPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [coordinators, setCoordinators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, coordinatorsRes] = await Promise.all([
          fetch('/api/projetos'),
          fetch('/api/coordenadores'),
        ]);

        if (!projectsRes.ok || !coordinatorsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const projectsData = await projectsRes.json();
        const coordinatorsData = await coordinatorsRes.json();

        const formattedProjects = projectsData.map((p: any) => ({
          id: p.id_projeto,
          name: p.nome_projeto || 'Nome não definido',
          code: p.conta,
          status: 'Ativo', // Placeholder
          budget: { current: 50000, total: 100000 }, // Placeholder
          coordinatorId: p.email_coordenador,
        }));

        const formattedCoordinators = coordinatorsData.map((c: any) => ({
            id: c.email,
            name: c.email,
            avatar: null, // Placeholder
        }));

        setProjects(formattedProjects);
        setCoordinators(formattedCoordinators);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    if (startPage > 1) {
        pageNumbers.push(
            <PaginationItem key="start-ellipsis">
                <PaginationEllipsis />
            </PaginationItem>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
            <PaginationItem key={i}>
                <PaginationLink href="#" isActive={i === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(i);}}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }

    if (endPage < totalPages) {
        pageNumbers.push(
            <PaginationItem key="end-ellipsis">
                <PaginationEllipsis />
            </PaginationItem>
        );
    }


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(Math.max(1, currentPage - 1)); }} />
                </PaginationItem>
                {pageNumbers}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(Math.min(totalPages, currentPage + 1)); }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

  if (loading) {
    return (
        <>
            <PageHeader title="Gestão de Projetos" />
            <p className="text-sm text-muted-foreground -mt-4 mb-6">
                Visualize e acesse a rubrica de cada projeto.
            </p>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Buscar Projeto</CardTitle>
                    <CardDescription>Filtre os projetos pelo nome para encontrar um específico.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6 space-y-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-2 w-full" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </CardContent>
                        <div className="px-6 pb-6">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
  }

  if (error) {
    return <div className="text-red-500">Erro ao carregar projetos: {error}</div>;
  }


  return (
    <>
      <PageHeader title="Gestão de Projetos">
      </PageHeader>
      <p className="text-sm text-muted-foreground -mt-4 mb-6">
            Visualize e acesse a rubrica de cada projeto.
      </p>

      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Buscar Projeto</CardTitle>
            <CardDescription>Filtre os projetos pelo nome para encontrar um específico.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="text"
                placeholder="Buscar por nome do projeto..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-10"
                />
            </div>
        </CardContent>
      </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.map((project) => {
          const coordinator = coordinators.find(c => c.id === project.coordinatorId);
          const budgetPercentage = (project.budget.current / project.budget.total) * 100;
          const status = statusConfig[project.status];

          return (
            <Card key={project.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">{project.code}</p>
                        </div>
                        {status && <Badge className={`text-white ${status.class}`}>{status.text}</Badge>}
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Orçamento</p>
                        <Progress value={budgetPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{formatCurrency(project.budget.current)}</span>
                            <span>{formatCurrency(project.budget.total)}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Coordenador</p>
                        {coordinator && <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{coordinator.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{coordinator.name}</span>
                        </div>}
                    </div>
                </CardContent>
                <div className="px-6 pb-6">
                     <Button asChild variant="outline" className="w-full">
                        <Link href={`/projetos/${project.id}`}>Ver Detalhes</Link>
                    </Button>
                </div>
            </Card>
          );
        })}
      </div>
      <div className="mt-8">
        {renderPagination()}
      </div>
    </>
  );
}
