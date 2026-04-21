import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar…" className="pl-9 w-64" />
        </div>
        <button className="relative h-9 w-9 rounded-lg border border-border bg-background hover:bg-accent transition-colors flex items-center justify-center">
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://i.pravatar.cc/100?img=47" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
