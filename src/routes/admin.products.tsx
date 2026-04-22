import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { initialProducts, type Product } from "@/data/mockData";
import { toast } from "sonner";
import {crearProducto} from  "../appi/app_productos";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

const empty: Omit<Product, "id" | "createdAt"> = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  image: "",
  active: true,
};

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(empty);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  );

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    const { id: _id, createdAt: _c, ...rest } = p;
    setForm(rest);
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (editing) {
      setProducts((arr) => arr.map((p) => (p.id === editing.id ? { ...editing, ...form } : p)));
      toast.success("Producto actualizado");
    } else {
      const newP: Product = {
        id: `p${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        ...form,
        image: form.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      };
      await crearProducto({...form});
      setProducts((arr) => [newP, ...arr]);
      toast.success("Producto creado");
    }
    setOpen(false);
  };

  const remove = (id: string) => {
    setProducts((arr) => arr.filter((p) => p.id !== id));
    toast.success("Producto eliminado");
  };

  return (
    <>
      <AdminTopbar title="Productos" />
      <main className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar producto o categoría…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={openNew}>
                <Plus className="h-4 w-4" />
                Nuevo producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar producto" : "Nuevo producto"}</DialogTitle>
                <DialogDescription>
                  Completa la información del producto.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Descripción</Label>
                  <Textarea id="desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Precio (USD)</Label>
                    <Input id="price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cat">Categoría</Label>
                  <Input id="cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="img">URL de imagen</Label>
                  <Input id="img" placeholder="https://…" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">Producto activo</p>
                    <p className="text-xs text-muted-foreground">Visible en la tienda</p>
                  </div>
                  <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button variant="hero" onClick={save}>{editing ? "Guardar cambios" : "Crear"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-[var(--shadow-sm)]">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{p.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                    <TableCell className="text-right font-medium">${p.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <span className={p.stock === 0 ? "text-destructive font-medium" : ""}>{p.stock}</span>
                    </TableCell>
                    <TableCell>
                      {p.active ? (
                        <Badge className="bg-success text-success-foreground hover:bg-success/90">Activo</Badge>
                      ) : (
                        <Badge variant="outline">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => remove(p.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
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
