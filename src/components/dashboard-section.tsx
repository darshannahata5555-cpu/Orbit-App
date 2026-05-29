"use client";

import { AlertTriangle, Bell, CalendarClock, CheckCircle2, Clock3, IndianRupee, MessageCircle, Truck, UsersRound } from "lucide-react";
import { channels, reimbursements, supportStats, tasks } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";

const ops = [
  { time: "2:00 PM", title: "Stage setup check", team: "Operations", status: "On track", tone: "bg-emerald-100 text-emerald-800" },
  { time: "4:00 PM", title: "Sponsor walkthrough", team: "Sponsorship", status: "Pending", tone: "bg-amber-100 text-amber-900" },
  { time: "5:30 PM", title: "Speaker confirmation", team: "Hospitality", status: "Blocked", tone: "bg-rose-100 text-rose-800" },
  { time: "7:00 PM", title: "Printing vendor payment", team: "Finance", status: "Pending", tone: "bg-amber-100 text-amber-900" },
];

const commandStatus = [
  { team: "Stage", state: "Ready", tone: "bg-emerald-500", surface: "bg-emerald-50" },
  { team: "Tech", state: "Sound check pending", tone: "bg-amber-500", surface: "bg-amber-50" },
  { team: "Sponsorship", state: "Completed", tone: "bg-emerald-500", surface: "bg-emerald-50" },
  { team: "Hospitality", state: "Speaker pickup delayed", tone: "bg-rose-500", surface: "bg-rose-50" },
  { team: "Finance", state: "Settled", tone: "bg-emerald-500", surface: "bg-emerald-50" },
];

const teamHealth = [
  { team: "Marketing", health: 92, note: "launch calendar ready", tone: "bg-emerald-500" },
  { team: "Operations", health: 71, note: "2 vendor checks open", tone: "bg-amber-500" },
  { team: "Tech", health: 54, note: "4 blockers need HOD", tone: "bg-rose-500" },
  { team: "Hospitality", health: 88, note: "speaker desk staffed", tone: "bg-emerald-500" },
];

const criticalAlerts = [
  { title: "Tech has 4 blockers", detail: "Sound check and lighting vendor confirmations are behind plan.", tone: "border-rose-300 bg-rose-50 text-rose-900" },
  { title: "Finance has 2 approvals pending", detail: "Stage Masters advance and printing bill need council signoff.", tone: "border-amber-300 bg-amber-50 text-amber-950" },
  { title: "Speaker pickup delayed", detail: "Hospitality needs backup vehicle confirmation before 5:30 PM.", tone: "border-rose-300 bg-rose-50 text-rose-900" },
];

const operationChannels = [
  { title: "Stage Operations", icon: MessageCircle, unread: 5 },
  { title: "Speakers", icon: Bell, unread: 2 },
  { title: "Sponsorship", icon: UsersRound, unread: 1 },
  { title: "Marketing", icon: Bell, unread: 4 },
  { title: "Finance", icon: IndianRupee, unread: 2 },
];

export function DashboardSection() {
  const activeEvent = useAppStore((state) => state.activeEvent);
  const localEvents = useAppStore((state) => state.localEvents);
  const event = localEvents.find((item) => item.id === activeEvent);
  const pendingApprovals = reimbursements.filter((item) => item.status === "Pending").length;
  const criticalBlockers = tasks.filter((task) => task.priority === "Critical" || task.status === "Blocked").length;

  return (
    <section className="space-y-7">
      <div className="rounded-[26px] bg-[#111111] p-5 text-white shadow-[0_18px_45px_-32px_rgba(17,17,17,0.8)]">
        <p className="text-sm text-white/65">Event HQ</p>
        <h1 className="mt-2 text-[32px] font-semibold leading-tight">{event?.name ?? "Yugaantar 2026"}</h1>
        <p className="mt-2 text-sm text-white/65">{event?.venue ?? "Campus Amphitheater"} - {event?.date ?? "May 14 - 18"}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "days remaining", value: "47", icon: CalendarClock },
            { label: "active tasks", value: String(supportStats.totalTasks), icon: CheckCircle2 },
            { label: "budget left", value: supportStats.remainingBudget, icon: IndianRupee },
            { label: "approvals", value: String(pendingApprovals), icon: Clock3 },
            { label: "blockers", value: String(criticalBlockers), icon: AlertTriangle },
          ].map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className={`rounded-[16px] p-3 ${metric.label === "blockers" ? "bg-rose-500/25" : "bg-white/10"}`}>
                <Icon className="h-4 w-4 text-white/70" />
                <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs text-white/60">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-[24px] font-semibold">Today&apos;s Operations</h2>
          <p className="text-sm text-neutral-600">What needs attention right now</p>
        </div>
        <div className="space-y-3">
          {ops.map((item) => (
            <div key={item.title} className="flex items-center gap-4 rounded-[22px] bg-white p-4 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <div className="w-16 shrink-0 text-sm font-semibold text-neutral-500">{item.time}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{item.team}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-[24px] font-semibold">Critical Alerts</h2>
          <p className="text-sm text-neutral-600">Intervention needed before the next checkpoint</p>
        </div>
        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div key={alert.title} className={`rounded-[20px] border p-4 ${alert.tone}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">{alert.title}</p>
                  <p className="mt-1 text-sm leading-5 opacity-80">{alert.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-[24px] font-semibold">Event-Day Command</h2>
          <p className="text-sm text-neutral-600">Live team status snapshot</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {commandStatus.map((item) => (
            <div key={item.team} className={`rounded-[18px] p-4 ${item.surface}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{item.team}</p>
                <span className={`h-3 w-3 rounded-full ${item.tone}`} />
              </div>
              <p className="mt-2 text-sm text-neutral-700">{item.state}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-[24px] font-semibold">Team Health</h2>
          <p className="text-sm text-neutral-600">Where leads should intervene first</p>
        </div>
        <div className="space-y-3">
          {teamHealth.map((item) => (
            <div key={item.team} className="rounded-[20px] bg-white p-4 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{item.team}</p>
                  <p className="mt-1 text-sm text-neutral-600">{item.note}</p>
                </div>
                <p className="text-lg font-semibold">{item.health}%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.health}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <details className="group rounded-[22px] bg-white p-4 shadow-[0_16px_36px_-32px_rgba(17,17,17,0.5)]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span className="block font-semibold">Operations Communication</span>
            <span className="mt-1 block text-sm text-neutral-600">14 unread across event channels</span>
          </span>
          <span className="text-sm font-semibold text-neutral-500 group-open:hidden">Open</span>
          <span className="hidden text-sm font-semibold text-neutral-500 group-open:block">Close</span>
        </summary>
        <div className="mt-4 space-y-2">
          {operationChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <button key={channel.title} className="flex w-full items-center justify-between rounded-[14px] bg-[#F7F7F3] px-3 py-2 text-left">
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{channel.title}</span>
                </span>
                <span className="rounded-full bg-[#111111] px-2.5 py-1 text-xs font-semibold text-white">{channel.unread}</span>
              </button>
            );
          })}
        </div>
      </details>

      <div className="rounded-[22px] bg-[#111111] p-4 text-white">
        <div className="flex items-center gap-3 text-sm text-white/70">
          <Truck className="h-5 w-5" />
          <span>{channels.length} active channels - {pendingApprovals} finance approvals waiting</span>
        </div>
      </div>
    </section>
  );
}
