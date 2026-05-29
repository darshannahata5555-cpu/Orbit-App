"use client";

import { ChevronRight, ShieldCheck, Users } from "lucide-react";
import { team } from "@/lib/mock-data";

export function TeamPanel() {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-[28px] font-semibold">Team</h1>
        <p className="text-sm text-neutral-600">Council, HODs, core members, and permissions</p>
      </div>

      <div className="space-y-4">
        {team.map((group) => (
          <div key={group.title} className="rounded-[24px] bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100">
                  <Users className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-medium">{group.title}</h2>
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-500" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.members.map((member) => (
                <div key={member.id} className="rounded-[18px] bg-[#F0F0ED] p-4">
                  <p className="font-semibold">{member.name}</p>
                  <p className="mt-1 text-sm text-neutral-600">{member.title}</p>
                  <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold">{member.department}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] bg-[#111111] p-5 text-white">
        <ShieldCheck className="h-5 w-5" />
        <p className="mt-4 text-xl font-medium">Role-based access</p>
        <p className="mt-2 text-sm leading-6 text-white/70">Management and Council approve budgets. HODs assign team tasks. Members update work and submit expenses.</p>
      </div>
    </section>
  );
}
