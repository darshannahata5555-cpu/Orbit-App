"use client";

import { AtSign, Bell, Hash, MessageCircle, Plus, UsersRound } from "lucide-react";

const shortcuts = [
  { label: "Catch up", value: "6 new", icon: Bell },
  { label: "Threads", value: "Caught up", icon: MessageCircle },
  { label: "Later", value: "0 items", icon: AtSign },
  { label: "Drafts", value: "3 drafts", icon: Hash },
];

const groups = [
  {
    title: "Mentions",
    icon: AtSign,
    items: ["finance-approvals", "stage-ops"],
  },
  {
    title: "Announcements",
    icon: Bell,
    items: ["all-company-announcements", "event-updates"],
  },
  {
    title: "Groups",
    icon: UsersRound,
    items: ["creative-x-copy", "offline-all-teams", "ug_midfunnel_internal"],
  },
  {
    title: "DM",
    icon: MessageCircle,
    items: ["Ava Roy", "Milan Shah", "Nina Patel", "Ryan Lee"],
  },
];

export function DashboardSection() {
  return (
    <section className="space-y-7">
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
        {shortcuts.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className="min-h-[80px] min-w-[92px] rounded-[8px] bg-[#D8D8D6] p-3 text-left transition hover:bg-[#cececc] sm:min-w-[132px]">
              <Icon className="h-5 w-5" />
              <p className="mt-3 text-sm font-semibold">{item.label}</p>
              <p className="mt-1 text-xs text-neutral-600">{item.value}</p>
            </button>
          );
        })}
      </div>

      <div className="space-y-8">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <section key={group.title} className="space-y-3">
              <div className="flex items-center gap-5">
                <span className="text-2xl font-semibold">#</span>
                <h2 className="text-[22px] font-medium">{group.title}</h2>
              </div>

              <div className="ml-1 space-y-2">
                {group.items.map((item) => (
                  <button key={item} className="flex w-full items-center gap-4 rounded-[14px] py-1.5 text-left transition hover:bg-white/70">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#D8D8D6]">
                      <Icon className="h-4 w-4 text-neutral-700" />
                    </span>
                    <span className="truncate text-base text-neutral-700">{item}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <button className="flex h-[88px] w-full items-center justify-center gap-3 rounded-[18px] bg-[#D8D8D6] text-lg font-medium text-[#111111] transition hover:bg-[#cececc]">
        <Plus className="h-5 w-5" />
        Create New Entry
      </button>
    </section>
  );
}
