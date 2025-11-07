import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-sidebar p-8 text-sidebar-foreground">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex justify-start">
              <Icons.logo className="h-12 w-auto" />
            </div>
            <h1 className="mb-6 text-3xl font-bold text-white">Faça seu Login</h1>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm font-medium text-white">CPF</Label>
                <Input id="cpf" placeholder="Escreva seu CPF" required className="bg-primary/20 border-primary/50 text-white placeholder:text-gray-300 focus:bg-primary/30 focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white">Senha</Label>
                <Input id="password" type="password" placeholder="Escreva sua Senha" required className="bg-primary/20 border-primary/50 text-white placeholder:text-gray-300 focus:bg-primary/30 focus:border-primary" />
              </div>
              <div className="text-right">
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              <Button asChild className="w-full bg-primary text-primary-foreground h-12 text-base font-bold hover:bg-primary/90">
                <Link href="/dashboard">Entrar</Link>
              </Button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-300">
                Não tem conta?{' '}
                <Link href="#" className="font-semibold text-white hover:underline">
                  entra em contato com suporte
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <Image
            src="https://picsum.photos/seed/login-background/1200/1800"
            alt="Fachada do prédio da empresa"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
            data-ai-hint="building facade"
          />
        </div>
      </div>
    </div>
  );
}
