"use client";

import { Bell, ChevronDown, Menu, Plus, UserRound } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export function Topbar() {
  const activeEvent = useAppStore((state) => state.activeEvent);
  const localEvents = useAppStore((state) => state.localEvents);
  const role = useAppStore((state) => state.role);
  const setSection = useAppStore((state) => state.setSection);
  const toggleCommand = useAppStore((state) => state.toggleCommand);

  const activeName = localEvents.find((event) => event.id === activeEvent)?.name ?? "Yugaantar";

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#D8D8D6]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[69px] w-full max-w-6xl items-center justify-between px-3 sm:px-6 lg:px-8">
        <button
          className="flex min-w-0 items-center gap-3 rounded-[22px] px-1 py-2 text-left transition hover:bg-black/5"
          onClick={() => setSection("EventSwitch")}
          aria-label="Switch event"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <span className="h-3 w-3 rounded-sm bg-[#111111]" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-[17px] font-bold leading-none text-[#111111]">
              Yugaantar
              <ChevronDown className="h-4 w-4" />
            </span>
            <span className="mt-1 block truncate text-xs font-medium text-neutral-600">{activeName} - {role}</span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleCommand}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#111111] shadow-sm transition hover:scale-105"
            aria-label="Create new entry"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#111111] shadow-sm transition hover:scale-105"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-lg bg-white text-[#111111] shadow-sm transition hover:scale-105 sm:flex"
            aria-label="Account"
          >
            <UserRound className="h-5 w-5" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#111111] shadow-sm transition hover:scale-105 lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
