"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Plus, UserRound } from "lucide-react";
import { departments, type Role } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
        <span className="h-3.5 w-3.5 rounded-sm bg-[#111111]" />
      </span>
      <div>
        <p className="text-xl font-bold leading-none">Orbit</p>
        <p className="mt-1 text-sm text-neutral-600">Event operations workspace</p>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-neutral-600">{label}</span>
      <input type={type} placeholder={placeholder} className="h-13 w-full rounded-[16px] border border-black/5 bg-white px-4 text-base outline-none transition focus:border-black/20" />
    </label>
  );
}

export function AuthFlow() {
  const [loginRole, setLoginRole] = useState<Extract<Role, "Council" | "HOD">>("HOD");
  const [loginDepartment, setLoginDepartment] = useState("Creative");
  const authView = useAppStore((state) => state.authView);
  const setAuthView = useAppStore((state) => state.setAuthView);
  const enterApp = useAppStore((state) => state.enterApp);
  const addEvent = useAppStore((state) => state.addEvent);
  const setRole = useAppStore((state) => state.setRole);
  const setAssignedDepartment = useAppStore((state) => state.setAssignedDepartment);
  const eventCount = useAppStore((state) => state.localEvents.length);
  const generatedCode = `YUG-${String(eventCount + 1).padStart(4, "0")}`;
  const hodDepartments = departments.filter((department) => department.id !== "Finance");

  const createMockEvent = () => {
    addEvent({
      id: `event-${generatedCode.toLowerCase()}`,
      name: "New Event",
      venue: "Main Campus",
      date: "Upcoming",
      code: generatedCode,
    });
  };

  const enterWorkspace = () => {
    setRole(loginRole);
    if (loginRole === "HOD") {
      setAssignedDepartment(loginDepartment);
    }
    enterApp();
  };

  return (
    <main className="min-h-screen bg-[#F7F7F3] px-4 py-6 text-[#111111]">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-md flex-col">
        <Brand />

        <div className="mt-10 flex-1">
          {authView === "Welcome" && (
            <section className="space-y-6">
              <div>
                <h1 className="text-[34px] font-semibold leading-tight">Run your event from one place.</h1>
                <p className="mt-3 text-base leading-6 text-neutral-600">Join an existing event with a code, sign in to your workspace, or create a new event for your team.</p>
              </div>

              <div className="space-y-3">
                <button onClick={() => setAuthView("Signup")} className="flex h-16 w-full items-center justify-between rounded-[18px] bg-[#111111] px-5 text-left text-lg font-semibold text-white">
                  Sign up for event
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={() => setAuthView("Login")} className="flex h-16 w-full items-center justify-between rounded-[18px] bg-[#D8D8D6] px-5 text-left text-lg font-semibold">
                  Login
                  <UserRound className="h-5 w-5" />
                </button>
                <button onClick={() => setAuthView("CreateEvent")} className="flex h-16 w-full items-center justify-between rounded-[18px] bg-white px-5 text-left text-lg font-semibold shadow-sm">
                  Create new event
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {authView === "Signup" && (
            <section className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold">Sign up</h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">Your request will be sent to the event creator or council for approval.</p>
              </div>
              <div className="space-y-4">
                <Field label="Name" placeholder="Your full name" />
                <Field label="Position" placeholder="Core member, HOD, volunteer" />
                <Field label="Event code" placeholder="Example: ORB-2026" />
                <Field label="Contact number" placeholder="Phone number" type="tel" />
                <Field label="Email ID" placeholder="name@example.com" type="email" />
              </div>
              <button onClick={() => setAuthView("PendingApproval")} className="flex h-14 w-full items-center justify-center rounded-[18px] bg-[#111111] font-semibold text-white">Send for approval</button>
              <button onClick={() => setAuthView("Welcome")} className="w-full py-2 text-sm font-medium text-neutral-600">Back</button>
            </section>
          )}

          {authView === "Login" && (
            <section className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold">Login</h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">Choose your event access. Council sees all departments. HODs only see their own department.</p>
              </div>
              <Field label="Email ID" placeholder="name@example.com" type="email" />
              <Field label="Event code" placeholder="Example: ORB-2026" />
              <div className="space-y-3">
                <p className="text-sm font-medium text-neutral-600">Access type</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["HOD", "Council"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setLoginRole(role)}
                      className={`h-12 rounded-[16px] text-sm font-semibold transition ${loginRole === role ? "bg-[#111111] text-white" : "bg-white text-neutral-700"}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              {loginRole === "HOD" && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-neutral-600">Your department</p>
                  <div className="grid grid-cols-2 gap-2">
                    {hodDepartments.map((department) => (
                      <button
                        key={department.id}
                        onClick={() => setLoginDepartment(department.id)}
                        className={`h-12 rounded-[16px] text-sm font-semibold transition ${loginDepartment === department.id ? "bg-[#111111] text-white" : "bg-white text-neutral-700"}`}
                      >
                        {department.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={enterWorkspace} className="flex h-14 w-full items-center justify-center rounded-[18px] bg-[#111111] font-semibold text-white">Enter workspace</button>
              <button onClick={() => setAuthView("Welcome")} className="w-full py-2 text-sm font-medium text-neutral-600">Back</button>
            </section>
          )}

          {authView === "CreateEvent" && (
            <section className="space-y-5">
              <div>
                <h1 className="text-[30px] font-semibold">Create event</h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">Create a workspace and generate a fresh event code for your team.</p>
              </div>
              <div className="space-y-4">
                <Field label="Event name" placeholder="Yugaantar 2026" />
                <Field label="Creator name" placeholder="Your full name" />
                <Field label="Creator email" placeholder="name@example.com" type="email" />
                <Field label="Venue" placeholder="Campus, hall, or online" />
                <Field label="Event dates" placeholder="May 14 - 18" />
              </div>
              <div className="rounded-[18px] bg-[#D8D8D6] p-4">
                <p className="text-sm font-semibold">Generated event code</p>
                <p className="mt-2 text-2xl font-bold">{generatedCode}</p>
              </div>
              <button onClick={createMockEvent} className="flex h-14 w-full items-center justify-center rounded-[18px] bg-[#111111] font-semibold text-white">Create event</button>
              <button onClick={() => setAuthView("Welcome")} className="w-full py-2 text-sm font-medium text-neutral-600">Back</button>
            </section>
          )}

          {authView === "PendingApproval" && (
            <section className="space-y-6 rounded-[26px] bg-white p-5 shadow-[0_18px_45px_-35px_rgba(17,17,17,0.45)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-[28px] font-semibold">Sent for approval</h1>
                <p className="mt-2 text-sm leading-6 text-neutral-600">Your signup request has been sent to the event creator or council. You can login once approved.</p>
              </div>
              <div className="flex items-center gap-3 rounded-[18px] bg-[#F0F0ED] p-4 text-sm text-neutral-700">
                <Mail className="h-5 w-5" />
                Approval updates will be sent to your email ID.
              </div>
              <button onClick={() => setAuthView("Login")} className="flex h-14 w-full items-center justify-center rounded-[18px] bg-[#111111] font-semibold text-white">Go to login</button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
