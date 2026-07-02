import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, BarChart3, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: BookOpen, label: "学习" },
  { to: "/novel", icon: Sparkles, label: "小说" },
  { to: "/stats", icon: BarChart3, label: "统计" },
  { to: "/profile", icon: User, label: "我的" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex flex-col items-center gap-1 px-3 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-primary-50 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 transition-colors ${
                  isActive ? "text-primary-500" : "text-text-secondary"
                }`}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span
                className={`relative z-10 text-xs font-medium transition-colors ${
                  isActive ? "text-primary-500" : "text-text-secondary"
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
