import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, ShieldOff, ShieldCheck } from "lucide-react";
import { initialUsers, type AdminUser } from "@/data/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

const empty: Omit<AdminUser, "id" | "joinedAt" | "avatar"> = {
  name: "",
  email: "",
  role: "user",
  status: "active",
};

function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm] = useState(empty);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  );

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (u: AdminUser) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status });
    setOpen(true);
  };
  const save = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Nombre y email son obligatorios");
      return;
    }
    if (editing) {
      setUsers((arr) => arr.map((u) => (u.id === editing.id ? { ...editing, ...form } : u)));
      toast.success("Usuario actualizado");
    } else {
      const id = `u${Date.now()}`;
      setUsers((arr) => [
        {
          id,
          ...form,
          joinedAt: new Date().toISOString().slice(0, 10),
          avatar: `https://i.pravatar.cc/100?u=${id}`,
        },
        ...arr,
      ]);
      toast.success("Usuario creado");
    }
    setOpen(false);
  };
  const remove = (id: string) => {
    setUsers((arr) => arr.filter((u) => u.id !== id));
    toast.success("Usuario eliminado");
  };
  const toggleStatus = (id: string) => {
    setUsers((arr) =>
      arr.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u,
      ),
    );
  };

  return (
    <>
      <AdminTopbar title="Usuarios" />
      <main className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuario o email…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={openNew}>
                <Plus className="h-4 w-4" />
                Nuevo usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="uname">Nombre</Label>
                  <Input id="uname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="uemail">Email</Label>
                  <Input id="uemail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Rol</Label>
                    <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as AdminUser["role"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="user">Usuario</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Estado</Label>
                    <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as AdminUser["status"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="suspended">Suspendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="hero" onClick={save}>{editing ? "Guardar" : "Crear"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-[var(--shadow-sm)]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registrado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.role === "admin" ? "default" : u.role === "editor" ? "secondary" : "outline"}>
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {u.status === "active" ? (
                        <Badge className="bg-success text-success-foreground hover:bg-success/90">Activo</Badge>
                      ) : (
                        <Badge variant="destructive">Suspendido</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{u.joinedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => toggleStatus(u.id)} title="Activar/Suspender">
                          {u.status === "active" ? (
                            <ShieldOff className="h-4 w-4 text-warning" />
                          ) : (
                            <ShieldCheck className="h-4 w-4 text-success" />
                          )}
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => openEdit(u)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => remove(u.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      Sin resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
