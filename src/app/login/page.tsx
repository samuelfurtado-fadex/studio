
'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("gerente");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-sidebar p-8 text-sidebar-foreground">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-start">
            <Icons.logo className="h-12 w-auto" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Acesse sua conta</h1>
          <p className="mb-6 text-sidebar-foreground/80">Selecione abaixo como deseja acessar e prossiga.</p>

           <Tabs defaultValue="gerente" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-sidebar-accent mb-6">
              <TabsTrigger value="gerente" className={cn(
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "text-sidebar-foreground/80"
              )}>Gerente</TabsTrigger>
              <TabsTrigger value="coordenador" className={cn(
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "text-sidebar-foreground/80"
              )}>Coordenador</TabsTrigger>
            </TabsList>
            <TabsContent value="gerente">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="cpf-gerente"
                    className="text-sm font-medium text-sidebar-foreground/80"
                  >
                    CPF
                  </Label>
                  <Input
                    id="cpf-gerente"
                    placeholder="Escreva seu CPF"
                    required
                    className="h-12 border-sidebar-border bg-sidebar-accent placeholder:text-sidebar-foreground/60 focus:border-primary focus:bg-sidebar-accent"
                  />
                </div>
                <div className="space-y-2">
                   <Label
                      htmlFor="password-gerente"
                      className="text-sm font-medium text-sidebar-foreground/80"
                    >
                      Senha
                    </Label>
                  <Input
                    id="password-gerente"
                    type="password"
                    placeholder="Escreva sua Senha"
                    required
                    className="h-12 border-sidebar-border bg-sidebar-accent placeholder:text-sidebar-foreground/60 focus:border-primary focus:bg-sidebar-accent"
                  />
                </div>
              </form>
            </TabsContent>
            <TabsContent value="coordenador">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="cpf-coordenador"
                    className="text-sm font-medium text-sidebar-foreground/80"
                  >
                    CPF
                  </Label>
                  <Input
                    id="cpf-coordenador"
                    placeholder="Escreva seu CPF"
                    required
                    className="h-12 border-sidebar-border bg-sidebar-accent placeholder:text-sidebar-foreground/60 focus:border-primary focus:bg-sidebar-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                      htmlFor="password-coordenador"
                      className="text-sm font-medium text-sidebar-foreground/80"
                    >
                      Senha
                    </Label>
                  <Input
                    id="password-coordenador"
                    type="password"
                    placeholder="Escreva sua Senha"
                    required
                    className="h-12 border-sidebar-border bg-sidebar-accent placeholder:text-sidebar-foreground/60 focus:border-primary focus:bg-sidebar-accent"
                  />
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
           <div className="mt-6 space-y-4">
              <Button
                asChild
                className="h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/dashboard">Entrar</Link>
              </Button>
               <div className="text-center">
                  <Link
                    href="#"
                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:underline"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
            </div>

          <p className="mt-8 text-center text-sm text-sidebar-foreground/70">
            Ainda não tem conta?{" "}
            <Link
              href="#"
              className="font-medium text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1542296332-9a542a275c3b?q=80&w=1974&auto=format&fit=crop"
          alt=""
          fill
          objectFit="cover"
          data-ai-hint="skateboarding sunset"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-sidebar/60 to-sidebar" />
      </div>
    </div>
  );
}
