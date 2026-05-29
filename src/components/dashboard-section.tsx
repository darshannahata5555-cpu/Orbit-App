"use client";

import { AtSign, Bell, ChevronRight, ClipboardCheck, FileText, IndianRupee, Megaphone, MessageCircle, Mic2, Palette, Tent, UsersRound } from "lucide-react";
import { departments, tasks } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const eventSpaces = [
  { title: "Speakers", icon: Mic2, unread: 3, pending: 1, tone: "bg-violet-100" },
  { title: "Finance", icon: IndianRupee, unread: 5, pending: 2, tone: "bg-emerald-100" },
  { title: "Marketing", icon: Palette, unread: 4, pending: 1, tone: "bg-rose-100" },
  { title: "Operations", icon: Tent, unread: 7, pending: 3, tone: "bg-amber-100" },
  { title: "Sponsorship", icon: UsersRound, unread: 2, pending: 1, tone: "bg-sky-100" },
];

const councilMentions = [
  { title: "finance-approvals", detail: "Milan needs approval on Stage Masters advance", count: 3 },
  { title: "stage-ops", detail: "Lighting layout needs final confirmation", count: 2 },
];

const announcements = [
  "Venue gate opens at 8 AM",
  "New sponsor onboarded",
  "Speaker desk briefing moved to 5 PM",
];

const dms = ["Ava Roy", "Samira Khan", "Milan Shah"];

const hodSpaces = [
  { title: "Team Chat", icon: MessageCircle, detail: "5 unread updates", tone: "bg-sky-100" },
  { title: "Assigned Work", icon: ClipboardCheck, detail: "3 due today", tone: "bg-amber-100" },
  { title: "Department Files", icon: FileText, detail: "Plans and assets", tone: "bg-violet-100" },
  { title: "Announcements", icon: Megaphone, detail: "2 council notes", tone: "bg-emerald-100" },
];

const hodAlerts = [
  { title: "Lighting vendor confirmation pending", detail: "Council needs your final go-ahead before payment." },
  { title: "Two members have unassigned shifts", detail: "Fill the evening coverage gap before standup." },
  { title: "Poster asset requested by PR", detail: "Creative needs the final dimensions by 4 PM." },
];

function CouncilHome() {
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
          {councilMentions.map((item) => (
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

      <CommonInbox />
    </section>
  );
}

function HodHome() {
  const activeDepartment = useAppStore((state) => state.activeDepartment);
  const setActiveDepartment = useAppStore((state) => state.setActiveDepartment);
  const departmentOptions = departments.filter((department) => department.id !== "Finance");
  const departmentTasks = tasks.filter((task) => task.department === activeDepartment || (activeDepartment === "Ops" && task.department === "Operations"));
  const openTasks = departmentTasks.filter((task) => task.status !== "Completed");
  const blockers = departmentTasks.filter((task) => task.status === "Blocked" || task.priority === "Critical");

  return (
    <section className="space-y-6">
      <div className="rounded-[22px] bg-[#111111] p-4 text-white shadow-[0_18px_45px_-32px_rgba(17,17,17,0.8)]">
        <p className="text-xs text-white/60">Department HOD</p>
        <h1 className="mt-1 text-[30px] font-semibold leading-tight">{activeDepartment} Department</h1>
        <p className="mt-1 text-xs text-white/60">Yugaantar 2026 - department workspace</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-[14px] bg-white/10 p-3">
            <p className="text-xl font-semibold">{openTasks.length}</p>
            <p className="text-[11px] text-white/55">open tasks</p>
          </div>
          <div className="rounded-[14px] bg-white/10 p-3">
            <p className="text-xl font-semibold">5</p>
            <p className="text-[11px] text-white/55">members</p>
          </div>
          <div className="rounded-[14px] bg-rose-500/25 p-3">
            <p className="text-xl font-semibold">{blockers.length}</p>
            <p className="text-[11px] text-white/55">blockers</p>
          </div>
        </div>
      </div>

      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
        {departmentOptions.map((department) => (
          <button
            key={department.id}
            onClick={() => setActiveDepartment(department.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
              activeDepartment === department.id ? "bg-[#111111] text-white" : "bg-white text-neutral-700",
            )}
          >
            {department.name}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Needs HOD Attention</h2>
          <p className="text-sm text-neutral-600">Department-level issues that need a lead decision</p>
        </div>
        <div className="space-y-2">
          {hodAlerts.map((alert) => (
            <button key={alert.title} className="flex w-full items-center justify-between gap-3 rounded-[18px] bg-white p-3 text-left shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <span className="min-w-0">
                <span className="block truncate font-semibold">{alert.title}</span>
                <span className="mt-0.5 block truncate text-sm text-neutral-600">{alert.detail}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-neutral-500" />
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Department Spaces</h2>
          <p className="text-sm text-neutral-600">Same workflow for every non-finance department</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {hodSpaces.map((space) => {
            const Icon = space.icon;
            return (
              <button key={space.title} className={`min-h-[112px] rounded-[18px] p-4 text-left transition hover:-translate-y-0.5 ${space.tone}`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-base font-semibold">{space.title}</p>
                <p className="mt-1 text-sm text-neutral-700">{space.detail}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">Today&apos;s Department Work</h2>
            <p className="text-sm text-neutral-600">Tasks owned by your team</p>
          </div>
          <button className="text-sm font-semibold text-neutral-600">View tasks</button>
        </div>
        <div className="space-y-2">
          {(departmentTasks.length ? departmentTasks : tasks.slice(0, 3)).slice(0, 3).map((task) => (
            <button key={task.id} className="w-full rounded-[18px] bg-white p-3 text-left shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate font-semibold">{task.title}</p>
                <span className="rounded-full bg-[#D8D8D6] px-2.5 py-1 text-xs font-semibold">{task.priority}</span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">{task.assignee} - Due {task.dueDate}</p>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

function CommonInbox() {
  return (
    <>
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
        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {dms.map((name) => (
            <button key={name} className="min-w-[132px] rounded-[16px] bg-white p-3 text-left shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D8D8D6] text-xs font-semibold">{name.split(" ").map((part) => part[0]).join("")}</span>
              <span className="mt-3 block text-sm font-semibold">{name}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export function DashboardSection() {
  const role = useAppStore((state) => state.role);

  if (role === "HOD" || role === "Core Member" || role === "Member") {
    return <HodHome />;
  }

  return <CouncilHome />;
}
