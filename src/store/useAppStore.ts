import { create } from "zustand";
import type { Role } from "@/lib/mock-data";

export type AppSection = "Dashboard" | "Tasks" | "Chats" | "Finance" | "CreateEntry" | "Files" | "Team" | "Settings" | "Search" | "EventSwitch" | "AddEvent";
export type AuthView = "Welcome" | "Login" | "Signup" | "CreateEvent" | "PendingApproval";

export type LocalEvent = {
  id: string;
  name: string;
  venue: string;
  date: string;
  code: string;
};

interface AppState {
  section: AppSection;
  authView: AuthView;
  authenticated: boolean;
  role: Role;
  activeEvent: string;
  localEvents: LocalEvent[];
  commandOpen: boolean;
  mobileNavOpen: boolean;
  setSection: (section: AppSection) => void;
  setAuthView: (view: AuthView) => void;
  enterApp: () => void;
  signOut: () => void;
  setRole: (role: Role) => void;
  setActiveEvent: (eventId: string) => void;
  addEvent: (event: LocalEvent) => void;
  toggleCommand: () => void;
  closeCommand: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  section: "Dashboard",
  authView: "Welcome",
  authenticated: false,
  role: "HOD",
  activeEvent: "orbit-fest-2026",
  localEvents: [
    { id: "orbit-fest-2026", name: "Orbit Fest 2026", venue: "Campus Amphitheater", date: "May 14 - 18", code: "ORB-2026" },
    { id: "hackday-sprint", name: "Campus Hack Day", venue: "Tech Hub", date: "June 4 - 5", code: "HACK-405" },
  ],
  commandOpen: false,
  mobileNavOpen: false,
  setSection: (section) => set({ section }),
  setAuthView: (authView) => set({ authView }),
  enterApp: () => set({ authenticated: true, section: "Dashboard" }),
  signOut: () => set({ authenticated: false, authView: "Welcome", section: "Dashboard" }),
  setRole: (role) => set({ role }),
  setActiveEvent: (activeEvent) => set({ activeEvent }),
  addEvent: (event) => set((state) => ({ localEvents: [event, ...state.localEvents], activeEvent: event.id, authenticated: true, section: "Dashboard" })),
  toggleCommand: () => set((state) => ({ commandOpen: !state.commandOpen })),
  closeCommand: () => set({ commandOpen: false }),
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
}));
