export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  active: boolean;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  status: "active" | "suspended";
  joinedAt: string;
  avatar: string;
};

export const initialProducts: Product[] = [
  { id: "p1", name: "Auriculares Pro X", description: "Cancelación de ruido activa, 40h batería.", price: 199.99, stock: 42, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", active: true, createdAt: "2025-01-12" },
  { id: "p2", name: "Smartwatch Lumen", description: "Pantalla AMOLED, GPS y monitor cardíaco.", price: 329.0, stock: 18, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", active: true, createdAt: "2025-02-03" },
  { id: "p3", name: "Cámara Mirrorless M3", description: "Sensor full-frame 24MP, video 4K60.", price: 1499.0, stock: 7, category: "Fotografía", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400", active: true, createdAt: "2025-02-20" },
  { id: "p4", name: "Teclado Mecánico K8", description: "Switches hot-swap, RGB por tecla.", price: 129.5, stock: 0, category: "Accesorios", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", active: false, createdAt: "2025-03-01" },
  { id: "p5", name: "Mochila Urbana 25L", description: "Resistente al agua, compartimento laptop.", price: 79.9, stock: 56, category: "Accesorios", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", active: true, createdAt: "2025-03-14" },
  { id: "p6", name: "Lámpara Ambient Glow", description: "Iluminación inteligente RGB con app.", price: 59.0, stock: 23, category: "Hogar", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", active: true, createdAt: "2025-03-22" },
];

export const initialUsers: AdminUser[] = [
  { id: "u1", name: "Ana Martínez", email: "ana@correo.com", role: "admin", status: "active", joinedAt: "2024-08-12", avatar: "https://i.pravatar.cc/100?img=47" },
  { id: "u2", name: "Carlos Ruiz", email: "carlos@correo.com", role: "editor", status: "active", joinedAt: "2024-09-03", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "u3", name: "Lucía Gómez", email: "lucia@correo.com", role: "user", status: "active", joinedAt: "2024-10-21", avatar: "https://i.pravatar.cc/100?img=32" },
  { id: "u4", name: "Diego Pérez", email: "diego@correo.com", role: "user", status: "suspended", joinedAt: "2024-11-09", avatar: "https://i.pravatar.cc/100?img=15" },
  { id: "u5", name: "María Soto", email: "maria@correo.com", role: "editor", status: "active", joinedAt: "2025-01-04", avatar: "https://i.pravatar.cc/100?img=49" },
  { id: "u6", name: "Pablo Vidal", email: "pablo@correo.com", role: "user", status: "active", joinedAt: "2025-02-18", avatar: "https://i.pravatar.cc/100?img=8" },
  { id: "u7", name: "Sofía Reyes", email: "sofia@correo.com", role: "user", status: "active", joinedAt: "2025-03-02", avatar: "https://i.pravatar.cc/100?img=23" },
];

export const salesData = [
  { month: "Ene", ventas: 4200 },
  { month: "Feb", ventas: 5100 },
  { month: "Mar", ventas: 4800 },
  { month: "Abr", ventas: 6200 },
  { month: "May", ventas: 7300 },
  { month: "Jun", ventas: 8100 },
];
