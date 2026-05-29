"use client";

import { Activity, CheckSquare, FileText, MessageSquare, Settings, ShieldAlert, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "Dashboard", label: "Dashboard", icon: Activity },
  { id: "Tasks", label: "Tasks", icon: CheckSquare },
  { id: "Chats", label: "Chats", icon: MessageSquare },
  { id: "Finance", label: "Finance", icon: ShieldAlert },
  { id: "Files", label: "Files", icon: FileText },
  { id: "Team", label: "Team", icon: Users },
  { id: "Settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const section = useAppStore((state) => state.section);
  const setSection = useAppStore((state) => state.setSection);
  const mobileNavOpen = useAppStore((state) => state.mobileNavOpen);
  const closeMobileNav = useAppStore((state) => state.closeMobileNav);

  const content = (
    <div className="flex h-full flex-col gap-6 border-r border-white/10 bg-[#09090B] px-5 py-6 text-white">
      <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-4 text-sm font-semibold shadow-lg shadow-black/30">
        <div className="h-10 w-10 rounded-2xl bg-[#0293FC] flex items-center justify-center text-base font-bold text-zinc-950">O</div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Orbit</p>
          <p className="text-sm text-white/90">Event Command</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSection(item.id);
                closeMobileNav();
              }}
              className={cn(
                "group flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm transition-all duration-200",
                active ? "bg-white/10 text-white shadow-[0_10px_30px_-24px_rgba(255,255,255,0.8)]" : "text-zinc-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Live pulse</p>
        <p className="mt-3 text-sm text-white/90">12 active threads · 7 approvals pending · 4 escalated items.</p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-72 shrink-0 flex-col gap-6 border-r border-white/10 px-5 py-6 lg:flex">{content}</aside>

      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileNav}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative z-10 h-full w-[280px]"
              onClick={(event) => event.stopPropagation()}
            >
              {content}
              <button
                onClick={closeMobileNav}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
