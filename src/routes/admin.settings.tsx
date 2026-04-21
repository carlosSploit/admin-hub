import { createFileRoute } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <AdminTopbar title="Ajustes" />
      <main className="p-6 max-w-3xl space-y-4">
        <Card className="shadow-[var(--shadow-sm)]">
          <CardHeader>
            <CardTitle>Información de la tienda</CardTitle>
            <CardDescription>Datos públicos del negocio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label>Nombre</Label><Input defaultValue="Mi Tienda" /></div>
            <div className="grid gap-2"><Label>Email de contacto</Label><Input defaultValue="hola@mitienda.com" /></div>
            <div className="grid gap-2"><Label>Moneda</Label><Input defaultValue="USD" /></div>
          </CardContent>
        </Card>
        <Card className="shadow-[var(--shadow-sm)]">
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { l: "Nuevos pedidos", d: "Recibe un email cuando entre un pedido." },
              { l: "Stock bajo", d: "Avisar cuando un producto baje de 5 unidades." },
              { l: "Nuevos usuarios", d: "Notificar cuando alguien se registre." },
            ].map((n) => (
              <div key={n.l} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{n.l}</p>
                  <p className="text-xs text-muted-foreground">{n.d}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex justify-end"><Button variant="hero">Guardar cambios</Button></div>
      </main>
    </>
  );
}
