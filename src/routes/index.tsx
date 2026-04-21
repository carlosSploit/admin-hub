import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[image:var(--gradient-subtle)] px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Panel de administración
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
          Control total de tu negocio
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Gestiona productos, usuarios y métricas desde un panel moderno, rápido y elegante.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild size="lg" variant="hero">
            <Link to="/admin/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Entrar al admin
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
