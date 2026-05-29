"use client";

import { CheckSquare, FileText, Home, Search, ShieldAlert } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { id: "Dashboard", label: "Home", icon: Home },
  { id: "Tasks", label: "Tasks", icon: CheckSquare },
  { id: "Finance", label: "Finance", icon: ShieldAlert },
  { id: "Files", label: "Files", icon: FileText },
  { id: "Search", label: "Search", icon: Search },
] as const;

export function BottomNav() {
  const section = useAppStore((state) => state.section);
  const setSection = useAppStore((state) => state.setSection);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-[#D8D8D6]/95 px-3 pb-3 pt-2 shadow-[0_-18px_45px_-35px_rgba(17,17,17,0.8)] backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[58px] max-w-6xl items-center justify-between gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = section === item.id || (section === "CreateEntry" && item.id === "Finance");
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex min-w-[54px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-1.5 text-[12px] font-medium transition ${
                active ? "bg-white text-[#111111] shadow-sm" : "text-neutral-700 hover:bg-white/70"
              }`}
            >
              <span className={`flex h-5 w-6 items-center justify-center rounded-md ${active ? "bg-[#111111] text-white" : "bg-white text-[#111111]"}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
