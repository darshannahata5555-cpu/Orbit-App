"use client";

import { Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-600">{label}</span>
      <input className="h-13 w-full rounded-[16px] bg-white px-4 outline-none" placeholder={placeholder} />
    </label>
  );
}

export function AddEventPanel() {
  const addEvent = useAppStore((state) => state.addEvent);
  const eventCount = useAppStore((state) => state.localEvents.length);
  const generatedCode = `YUG-${String(eventCount + 1).padStart(4, "0")}`;

  const createEvent = () => {
    addEvent({
      id: `added-event-${generatedCode.toLowerCase()}`,
      name: "New Event",
      venue: "Main Campus",
      date: "Upcoming",
      code: generatedCode,
    });
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[30px] font-semibold">Add event</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-600">Create another event workspace and generate a new event code for approvals.</p>
      </div>

      <div className="rounded-[26px] bg-[#D8D8D6] p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Event name" placeholder="Yugaantar 2027" />
          <Field label="Event type" placeholder="Fest, hackathon, workshop" />
          <Field label="Venue" placeholder="Campus Amphitheater" />
          <Field label="Dates" placeholder="May 14 - 18" />
          <Field label="Creator email" placeholder="creator@example.com" />
          <Field label="Council email" placeholder="council@example.com" />
        </div>
        <div className="mt-5 rounded-[18px] bg-white p-4">
          <p className="text-sm font-semibold text-neutral-600">Generated event code</p>
          <p className="mt-1 text-2xl font-bold">{generatedCode}</p>
        </div>
      </div>

      <button onClick={createEvent} className="flex h-14 w-full items-center justify-center gap-3 rounded-[18px] bg-[#111111] font-semibold text-white">
        <Plus className="h-5 w-5" />
        Create event
      </button>
    </section>
  );
}
