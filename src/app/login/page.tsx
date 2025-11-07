import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-sidebar p-8 text-sidebar-foreground">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-start">
            <Icons.logo className="h-12 w-auto" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Faça seu Login</h1>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="cpf"
                className="text-sm font-medium text-sidebar-foreground/80"
              >
                CPF
              </Label>
              <Input
                id="cpf"
                placeholder="Escreva seu CPF"
                required
                className="h-12 border-sidebar-border bg-sidebar-accent placeholder:text-sidebar-foreground/60 focus:border-primary focus:bg-sidebar-accent"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-sidebar-foreground/80"
                >
                  Senha
                </Label>
                <Link
                  href="#"
                  className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Escreva sua Senha"
                required
                className="h-12 border-sidebar-border bg-sidebar-accent placeholder:text-sidebar-foreground/60 focus:border-primary focus:bg-sidebar-accent"
              />
            </div>

            <Button
              asChild
              className="h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/dashboard">Entrar</Link>
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-sidebar-foreground/70">
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
          alt="Pessoa andando de skate ao pôr do sol"
          layout="fill"
          objectFit="cover"
          data-ai-hint="skateboarding sunset"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-sidebar/60 to-sidebar" />
      </div>
    </div>
  );
}
