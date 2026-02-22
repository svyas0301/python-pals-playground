import { NavLink } from "react-router-dom";
import { Home, BookOpen, TrendingUp, Trophy, Users, TreePine, Paintbrush, Settings, Star } from "lucide-react";
import mascot from "@/assets/mascot.png";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard", emoji: "🏠" },
  { to: "/lessons", icon: BookOpen, label: "Lessons", emoji: "📚" },
  { to: "/progress", icon: TrendingUp, label: "Progress", emoji: "📊" },
  { to: "/achievements", icon: Trophy, label: "Achievements", emoji: "🏆" },
  { to: "/leaderboard", icon: Users, label: "Leaderboard", emoji: "🥇" },
  { to: "/skill-tree", icon: TreePine, label: "Skill Tree", emoji: "🌳" },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-xl">🐍</span>
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">
          PyKids
        </h1>
      </div>

      {/* Profile */}
      <div className="px-5 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center overflow-hidden">
            <img src={mascot} alt="Avatar" className="w-8 h-8" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">Young Coder</p>
            <p className="text-xs text-muted-foreground">Module 1 · Age 8-15</p>
          </div>
        </div>
        {/* XP Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Level 1</span>
            <span className="text-accent font-bold">120 / 500 XP</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-xp-fill" style={{ width: "24%" }} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`
            }
          >
            <span className="text-lg">{item.emoji}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Settings */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
        >
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
