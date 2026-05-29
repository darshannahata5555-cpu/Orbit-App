"use client";

import { AtSign, Bell, ChevronRight, IndianRupee, Megaphone, MessageCircle, Mic2, Palette, Tent, UsersRound } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const eventSpaces = [
  { title: "Speakers", icon: Mic2, unread: 3, pending: 1, tone: "bg-violet-100" },
  { title: "Finance", icon: IndianRupee, unread: 5, pending: 2, tone: "bg-emerald-100" },
  { title: "Marketing", icon: Palette, unread: 4, pending: 1, tone: "bg-rose-100" },
  { title: "Operations", icon: Tent, unread: 7, pending: 3, tone: "bg-amber-100" },
  { title: "Sponsorship", icon: UsersRound, unread: 2, pending: 1, tone: "bg-sky-100" },
];

const mentions = [
  { title: "finance-approvals", detail: "Milan needs approval on Stage Masters advance", count: 3 },
  { title: "stage-ops", detail: "Lighting layout needs final confirmation", count: 2 },
];

const announcements = [
  "Venue gate opens at 8 AM",
  "New sponsor onboarded",
  "Speaker desk briefing moved to 5 PM",
];

const dms = ["Ava Roy", "Samira Khan", "Milan Shah"];

export function DashboardSection() {
  const activeEvent = useAppStore((state) => state.activeEvent);
  const localEvents = useAppStore((state) => state.localEvents);
  const event = localEvents.find((item) => item.id === activeEvent);

  return (
    <section className="space-y-6">
      <div className="rounded-[22px] bg-[#111111] p-4 text-white shadow-[0_18px_45px_-32px_rgba(17,17,17,0.8)]">
        <p className="text-xs text-white/60">Current event</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-[30px] font-semibold leading-tight">{event?.name ?? "Yugaantar 2026"}</h1>
            <p className="mt-1 text-xs text-white/60">{event?.venue ?? "Campus Amphitheater"} - {event?.date ?? "May 14 - 18"}</p>
          </div>
          <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{event?.code ?? "YUG-2026"}</div>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Needs Attention</h2>
            <p className="text-sm text-neutral-600">Directed updates and pending replies</p>
          </div>
          <AtSign className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="space-y-2">
          {mentions.map((item) => (
            <button key={item.title} className="flex w-full items-center justify-between gap-3 rounded-[18px] bg-white p-3 text-left shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <span className="min-w-0">
                <span className="block truncate font-semibold">@{item.title}</span>
                <span className="mt-0.5 block truncate text-sm text-neutral-600">{item.detail}</span>
              </span>
              <span className="rounded-full bg-[#111111] px-2.5 py-1 text-xs font-semibold text-white">{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Event Spaces</h2>
            <p className="text-sm text-neutral-600">Teams, conversations, tasks, and files together</p>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {eventSpaces.map((space) => {
            const Icon = space.icon;
            return (
              <button key={space.title} className={`min-h-[118px] rounded-[18px] p-4 text-left transition hover:-translate-y-0.5 ${space.tone}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold">{space.unread} unread</span>
                </div>
                <p className="mt-4 text-base font-semibold">{space.title}</p>
                <p className="mt-1 text-sm text-neutral-700">{space.pending} pending task{space.pending > 1 ? "s" : ""}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Announcements</h2>
        </div>
        <div className="space-y-2">
          {announcements.map((item) => (
            <button key={item} className="flex w-full items-center justify-between rounded-[16px] bg-white p-3 text-left shadow-sm">
              <span className="truncate text-sm font-medium">{item}</span>
              <Bell className="h-4 w-4 shrink-0 text-neutral-500" />
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="text-xl font-semibold">DMs</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {dms.map((name) => (
            <button key={name} className="min-w-[132px] rounded-[16px] bg-white p-3 text-left shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D8D8D6] text-xs font-semibold">{name.split(" ").map((part) => part[0]).join("")}</span>
              <span className="mt-3 block text-sm font-semibold">{name}</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
