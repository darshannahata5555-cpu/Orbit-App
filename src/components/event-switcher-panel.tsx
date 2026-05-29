"use client";

import { Check, Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export function EventSwitcherPanel() {
  const activeEvent = useAppStore((state) => state.activeEvent);
  const localEvents = useAppStore((state) => state.localEvents);
  const setActiveEvent = useAppStore((state) => state.setActiveEvent);
  const setSection = useAppStore((state) => state.setSection);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[30px] font-semibold">Switch event</h1>
        <p className="mt-2 text-sm text-neutral-600">Choose the event workspace you want to manage.</p>
      </div>

      <div className="space-y-3">
        {localEvents.map((event) => {
          const active = event.id === activeEvent;
          return (
            <button
              key={event.id}
              onClick={() => {
                setActiveEvent(event.id);
                setSection("Dashboard");
              }}
              className="flex w-full items-center justify-between gap-4 rounded-[22px] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5"
            >
              <span>
                <span className="block text-lg font-semibold">{event.name}</span>
                <span className="mt-1 block text-sm text-neutral-600">{event.venue} - {event.date}</span>
                <span className="mt-3 inline-flex rounded-full bg-[#D8D8D6] px-3 py-1 text-xs font-semibold">{event.code}</span>
              </span>
              {active ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-white">
                  <Check className="h-5 w-5" />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <button onClick={() => setSection("AddEvent")} className="flex h-[72px] w-full items-center justify-center gap-3 rounded-[18px] bg-[#D8D8D6] text-lg font-medium transition hover:bg-[#cececc]">
        <Plus className="h-5 w-5" />
        Add event
      </button>
    </section>
  );
}
