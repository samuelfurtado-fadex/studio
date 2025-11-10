export type Coordinator = {
  id: string;
  name: string;
  project: string;
  pendingBalance: number;
  availableBalance: number;
  email: string;
  phone: string;
  cpf: string;
  avatar: string;
  prestacaoContasStatus: 'Em Aberto' | 'Enviada por E-mail' | 'Entregue na recepção';
  hasDocument: boolean;
};

export type Project = {
  id: string;
  code: string;
  name: string;
  coordinator: string;
  coordinatorId: string;
  budgetHead: string;
  status: 'Ativo' | 'Concluído' | 'Em Pausa';
  openSupplies: number;
  canCreateNewSupply: boolean;
  budget: {
    current: number;
    total: number;
  };
};

export type Debt = {
  id: string;
  coordinatorName: string;
  projectName: string;
  value: number;
  dueDate: Date;
  status: 'Pendente' | 'Pago';
};

export const coordinators: Coordinator[] = [
  { id: '1', name: 'João da Silva', project: 'Projeto Alpha', pendingBalance: 1500.00, availableBalance: 8500.00, email: 'joao.silva@example.com', phone: '(11) 98765-4321', cpf: '123.456.789-00', avatar: 'user-1', prestacaoContasStatus: 'Enviada por E-mail', hasDocument: true },
  { id: '2', name: 'Maria Oliveira', project: 'Projeto Beta', pendingBalance: 250.50, availableBalance: 4750.50, email: 'maria.oliveira@example.com', phone: '(21) 91234-5678', cpf: '234.567.890-11', avatar: 'user-2', prestacaoContasStatus: 'Entregue na recepção', hasDocument: true },
  { id: '3', name: 'Carlos Pereira', project: 'Projeto Gamma', pendingBalance: 5300.75, availableBalance: 14700.25, email: 'carlos.pereira@example.com', phone: '(31) 95678-1234', cpf: '345.678.901-22', avatar: 'user-3', prestacaoContasStatus: 'Em Aberto', hasDocument: false },
  { id: '4', name: 'Ana Souza', project: 'Projeto Delta', pendingBalance: 0.00, availableBalance: 12000.00, email: 'ana.souza@example.com', phone: '(41) 98765-1234', cpf: '456.789.012-33', avatar: 'user-4', prestacaoContasStatus: 'Em Aberto', hasDocument: false },
  { id: '5', name: 'Rafael Santos', project: 'Projeto Epsilon', pendingBalance: 800.00, availableBalance: 2200.00, email: 'rafael.santos@example.com', phone: '(51) 91234-8765', cpf: '567.890.123-44', avatar: 'user-5', prestacaoContasStatus: 'Enviada por E-mail', hasDocument: true },
];

export const projects: Project[] = [
  { id: '1', code: 'PROJ-001', name: 'Projeto Alpha', coordinator: 'João da Silva', coordinatorId: '1', budgetHead: 'Pesquisa e Desenvolvimento', status: 'Ativo', openSupplies: 3, canCreateNewSupply: true, budget: { current: 74500, total: 100000 } },
  { id: '2', code: 'PROJ-002', name: 'Projeto Beta', coordinator: 'Maria Oliveira', coordinatorId: '2', budgetHead: 'Marketing Digital', status: 'Ativo', openSupplies: 1, canCreateNewSupply: true, budget: { current: 182500, total: 205000 } },
  { id: '3', code: 'PROJ-003', name: 'Projeto Gamma', coordinator: 'Carlos Pereira', coordinatorId: '3', budgetHead: 'Infraestrutura', status: 'Concluído', openSupplies: 0, canCreateNewSupply: false, budget: { current: 125000, total: 125000 } },
  { id: '4', code: 'PROJ-004', name: 'Projeto Delta', coordinator: 'Ana Souza', coordinatorId: '4', budgetHead: 'Recursos Humanos', status: 'Em Pausa', openSupplies: 2, canCreateNewSupply: false, budget: { current: 35000, total: 90000 } },
  { id: '5', code: 'PROJ-005', name: 'Projeto Epsilon', coordinator: 'Rafael Santos', coordinatorId: '5', budgetHead: 'Consultoria Externa', status: 'Ativo', openSupplies: 5, canCreateNewSupply: false, budget: { current: 15000, total: 50000 } },
];

const today = new Date();
export const debts: Debt[] = [
  { id: '1', coordinatorName: 'João da Silva', projectName: 'Projeto Alpha', value: 350.00, dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), status: 'Pendente' },
  { id: '2', coordinatorName: 'Maria Oliveira', projectName: 'Projeto Beta', value: 120.50, dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), status: 'Pendente' },
  { id: '3', coordinatorName: 'Carlos Pereira', projectName: 'Projeto Gamma', value: 2500.00, dueDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000), status: 'Pendente' },
  { id: '4', coordinatorName: 'Rafael Santos', projectName: 'Projeto Epsilon', value: 400.00, dueDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), status: 'Pendente' },
  { id: '5', coordinatorName: 'João da Silva', projectName: 'Projeto Alpha', value: 800.00, dueDate: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000), status: 'Pendente' },
  { id: '6', coordinatorName: 'Carlos Pereira', projectName: 'Projeto Gamma', value: 1200.00, dueDate: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000), status: 'Pago' },
];

export const monthlyDebtData = [
  { month: 'Jan', debts: 4000 },
  { month: 'Fev', debts: 3000 },
  { month: 'Mar', debts: 5000 },
  { month: 'Abr', debts: 4500 },
  { month: 'Mai', debts: 6000 },
  { month: 'Jun', debts: 5500 },
  { month: 'Jul', debts: 7000 },
  { month: 'Ago', debts: 6500 },
  { month: 'Set', debts: 7500 },
  { month: 'Out', debts: 8000 },
  { month: 'Nov', debts: 7200 },
  { month: 'Dez', debts: 9000 },
];

export const dailyDebtData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  debts: Math.floor(Math.random() * 500) + 100,
}));
