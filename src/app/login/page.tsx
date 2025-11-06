import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Icons.logo className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Prestação de Contas FADEX</CardTitle>
          <CardDescription>Bem-vindo! Faça login para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="000.000.000-00" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/dashboard">Entrar</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
