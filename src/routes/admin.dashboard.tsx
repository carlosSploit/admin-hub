import { createFileRoute } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, TrendingUp, ArrowUpRight } from "lucide-react";
import { initialProducts, initialUsers, salesData } from "@/data/mockData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
});

const stats = [
  { label: "Productos", value: initialProducts.length, change: "+12%", icon: Package, color: "text-primary" },
  { label: "Usuarios", value: initialUsers.length, change: "+8%", icon: Users, color: "text-success" },
  { label: "Pedidos", value: 248, change: "+23%", icon: ShoppingCart, color: "text-warning" },
  { label: "Ingresos", value: "$35.7k", change: "+18%", icon: TrendingUp, color: "text-primary-glow" },
];

function DashboardPage() {
  return (
    <>
      <AdminTopbar title="Dashboard" />
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="border-border shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">{s.value}</p>
                      <div className="mt-2 flex items-center gap-1 text-xs text-success">
                        <ArrowUpRight className="h-3 w-3" />
                        {s.change} vs mes anterior
                      </div>
                    </div>
                    <div className={`h-10 w-10 rounded-lg bg-accent flex items-center justify-center ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 shadow-[var(--shadow-sm)]">
            <CardHeader>
              <CardTitle>Ventas mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.55 0.22 265)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="oklch(0.55 0.22 265)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" />
                    <XAxis dataKey="month" stroke="oklch(0.5 0.03 256)" fontSize={12} />
                    <YAxis stroke="oklch(0.5 0.03 256)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid oklch(0.92 0.01 255)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area type="monotone" dataKey="ventas" stroke="oklch(0.55 0.22 265)" strokeWidth={2} fill="url(#g)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-[var(--shadow-sm)]">
            <CardHeader>
              <CardTitle>Usuarios recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {initialUsers.slice(0, 5).map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <Badge variant={u.role === "admin" ? "default" : "secondary"}>{u.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
