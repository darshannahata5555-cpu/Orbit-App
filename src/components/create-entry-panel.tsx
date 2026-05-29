"use client";

import { Camera, FileUp } from "lucide-react";

export function CreateEntryPanel() {
  return (
    <section className="space-y-6">
      <div className="rounded-[26px] bg-white p-5 shadow-[0_18px_45px_-35px_rgba(17,17,17,0.45)]">
        <h1 className="mb-6 text-[28px] font-semibold">Create New Entry</h1>

        <div className="grid gap-4 text-[21px] font-medium sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-neutral-500">Date</span>
            <input className="w-full rounded-[16px] bg-[#F0F0ED] px-4 py-3 outline-none" placeholder="May 29, 2026" />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-neutral-500">Amount</span>
            <input className="w-full rounded-[16px] bg-[#F0F0ED] px-4 py-3 outline-none" placeholder="₹0" />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-neutral-500">Department</span>
            <input className="w-full rounded-[16px] bg-[#F0F0ED] px-4 py-3 outline-none" placeholder="Finance" />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-neutral-500">Reason</span>
            <input className="w-full rounded-[16px] bg-[#F0F0ED] px-4 py-3 outline-none" placeholder="Reimbursement request" />
          </label>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <button className="flex min-h-[62px] items-center gap-3 rounded-[18px] bg-[#D8D8D6] px-5 text-left text-xl font-medium transition hover:bg-[#cececc]">
            <FileUp className="h-5 w-5" />
            Upload Invoice
          </button>
          <button className="flex min-h-[62px] items-center gap-3 rounded-[18px] bg-[#D8D8D6] px-5 text-left text-xl font-medium transition hover:bg-[#cececc]">
            <Camera className="h-5 w-5" />
            Upload Transaction SS
          </button>
        </div>

        <button className="mt-7 flex h-14 w-full items-center justify-center rounded-[18px] bg-[#111111] text-base font-semibold text-white transition hover:bg-neutral-800">
          Submit Entry
        </button>
      </div>
    </section>
  );
}
