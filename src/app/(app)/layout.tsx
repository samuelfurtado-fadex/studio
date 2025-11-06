'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Bell,
  FileJson,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/coordenadores', icon: Users, label: 'Coordenadores' },
  { href: '/projetos', icon: FolderKanban, label: 'Projetos' },
  { href: '/alertas', icon: Bell, label: 'Alertas de Vencimento' },
  { href: '/matriz', icon: FileJson, label: 'Matriz de Decisão' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6" />
            <span className="text-lg font-semibold">FADEX</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    asChild
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Link href="/login" passHref>
            <SidebarMenuButton asChild>
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can be used for breadcrumbs or page title */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
