"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { quickActions } from "@/lib/mock-data";

export function CommandPalette() {
  const [query, setQuery] = useState("");
  const open = useAppStore((state) => state.commandOpen);
  const close = useAppStore((state) => state.closeCommand);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        useAppStore.getState().toggleCommand();
      }
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  const filtered = quickActions.filter((action) => action.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            className="w-full max-w-xl rounded-[28px] bg-[#F7F7F3] p-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-4">
              <Command className="h-5 w-5 text-neutral-500" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search actions, tasks, threads..."
                className="w-full bg-transparent text-lg font-medium outline-none placeholder:text-neutral-500"
              />
            </div>
            <div className="mt-3 space-y-2">
              {filtered.length ? (
                filtered.map((action) => (
                  <button key={action} className="flex w-full items-center justify-between rounded-[18px] bg-white px-4 py-3 text-left text-sm transition hover:bg-[#D8D8D6]">
                    <span>{action}</span>
                    <span className="text-neutral-500">Enter</span>
                  </button>
                ))
              ) : (
                <div className="rounded-[18px] bg-white px-4 py-4 text-sm text-neutral-500">No matching actions found.</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
