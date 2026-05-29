"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Topbar } from "@/components/topbar";
import { CommandPalette } from "@/components/command-palette";
import { BottomNav } from "@/components/bottom-nav";
import { DashboardSection } from "@/components/dashboard-section";
import { TaskBoard } from "@/components/task-board";
import { FinancePanel } from "@/components/finance-panel";
import { CreateEntryPanel } from "@/components/create-entry-panel";
import { FilesPanel } from "@/components/files-panel";
import { SearchPanel } from "@/components/search-panel";
import { TeamPanel } from "@/components/team-panel";
import { ChatPanel } from "@/components/chat-panel";
import { AuthFlow } from "@/components/auth-flow";
import { EventSwitcherPanel } from "@/components/event-switcher-panel";
import { AddEventPanel } from "@/components/add-event-panel";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const section = useAppStore((state) => state.section);
  const authenticated = useAppStore((state) => state.authenticated);

  if (!authenticated) {
    return <AuthFlow />;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#111111]">
      <Topbar />

      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {section === "Dashboard" && <DashboardSection />}
            {section === "Tasks" && <TaskBoard />}
            {section === "Finance" && <FinancePanel />}
            {section === "CreateEntry" && <CreateEntryPanel />}
            {section === "Files" && <FilesPanel />}
            {section === "Search" && <SearchPanel />}
            {section === "EventSwitch" && <EventSwitcherPanel />}
            {section === "AddEvent" && <AddEventPanel />}
            {section === "Chats" && <ChatPanel />}
            {section === "Team" && <TeamPanel />}
            {section === "Settings" && <TeamPanel />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />
      <CommandPalette />
    </div>
  );
}
