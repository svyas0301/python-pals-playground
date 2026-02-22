import Sidebar from "./Sidebar";
import { Star } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8">
          <div />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-accent/20 px-3 py-1.5 rounded-full">
              <span className="text-accent text-sm">⭐</span>
              <span className="text-accent font-display font-bold text-sm">Lv 1</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
              <span className="text-sm">🔥</span>
              <span className="font-display font-bold text-sm text-foreground">3 day streak</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
              Y
            </div>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
