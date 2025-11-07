import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background">
      <Image
        src="https://picsum.photos/seed/login-background/1800/1200"
        alt="Imagem de fundo abstrata"
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint="abstract background"
      />
      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-xl shadow-2xl md:grid-cols-2">
        <div className="flex flex-col items-center justify-center border-r border-white/10 bg-gray-900/40 p-8 text-white backdrop-blur-md">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex justify-start">
              <Icons.logo className="h-10 w-auto" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Olá!</h1>
            <p className="mb-6 text-gray-300">
              Faça login para gerenciar suas finanças.
            </p>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="cpf"
                  className="text-sm font-medium text-gray-300"
                >
                  CPF
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  required
                  className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:bg-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  required
                  className="border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-primary focus:bg-white/20"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Adicionar checkbox "Lembrar-me" se necessário */}
                </div>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Button
                asChild
                className="h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/dashboard">Entrar</Link>
              </Button>
            </form>
          </div>
        </div>
        <div className="relative hidden items-center justify-center p-8 md:flex">
          {/* Pode ser usado para conteúdo adicional no lado direito, se necessário. Atualmente está vazio para dar foco à imagem. */}
        </div>
      </div>
    </div>
  );
}
