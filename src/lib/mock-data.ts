export type Role = "Management" | "Council" | "HOD" | "Core Member" | "Member" | "Finance";

type Department = {
  id: string;
  name: string;
  accent: string;
};

type Member = {
  id: string;
  name: string;
  role: Role;
  department: string;
  title: string;
  avatar: string;
};

type TaskStatus = "Todo" | "In Progress" | "Review" | "Completed" | "Blocked";

type Priority = "Low" | "Medium" | "High" | "Critical";

type Task = {
  id: string;
  title: string;
  description: string;
  department: string;
  assignee: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  dependencies: string[];
  files: string[];
  thread: string;
  approvalRequired: boolean;
  comments: number;
  escalated: boolean;
};

type Reimbursement = {
  id: string;
  vendor: string;
  amount: string;
  submittedBy: string;
  department: string;
  status: "Pending" | "Approved" | "Rejected";
  invoice: string;
  chain: string;
  flagged: boolean;
};

type FileItem = {
  id: string;
  name: string;
  type: string;
  tag: string;
  size: string;
  updated: string;
};

type Message = {
  id: string;
  author: string;
  content: string;
  time: string;
  reactions?: string[];
};

type Channel = {
  id: string;
  name: string;
  description: string;
  department: string;
  pinned: string[];
  participants: string[];
  messages: Message[];
};

type TeamGroup = {
  title: string;
  members: Member[];
};

export const eventOptions = [
  {
    id: "orbit-fest-2026",
    name: "Orbit Fest 2026",
    venue: "Campus Amphitheater",
    date: "May 14 - 18",
  },
  {
    id: "hackday-sprint",
    name: "Campus Hack Day",
    venue: "Tech Hub",
    date: "June 4 - 5",
  },
];

export const roles: Role[] = ["Management", "Council", "HOD", "Finance", "Core Member", "Member"];

export const departments: Department[] = [
  { id: "Tech", name: "Tech", accent: "#7C3AED" },
  { id: "Finance", name: "Finance", accent: "#0EA5E9" },
  { id: "Creative", name: "Creatives", accent: "#F97316" },
  { id: "PR", name: "PR", accent: "#22C55E" },
  { id: "Ops", name: "Operations", accent: "#38BDF8" },
  { id: "Security", name: "Security", accent: "#F43F5E" },
];

export const members: Member[] = [
  { id: "ava", name: "Ava Roy", role: "HOD", department: "Tech", title: "HOD — Tech", avatar: "AR" },
  { id: "milan", name: "Milan Shah", role: "Finance", department: "Finance", title: "Finance Lead", avatar: "MS" },
  { id: "nina", name: "Nina Patel", role: "Core Member", department: "Creative", title: "Design Lead", avatar: "NP" },
  { id: "ryan", name: "Ryan Lee", role: "Member", department: "PR", title: "PR Executive", avatar: "RL" },
  { id: "sam", name: "Samira Khan", role: "Council", department: "Operations", title: "Operations Council", avatar: "SK" },
  { id: "liam", name: "Management", department: "Security", title: "Safety Chief", role: "Management", avatar: "LL" },
];

export const tasks: Task[] = [
  {
    id: "T-102",
    title: "Finalize stage lighting layout",
    description: "Review rig placement, safety clearances, and electrical zones for opening ceremony.",
    department: "Tech",
    assignee: "Ava Roy",
    priority: "High",
    status: "In Progress",
    dueDate: "May 16",
    dependencies: ["T-087"],
    files: ["lighting-plan.pdf"],
    thread: "stage-ops",
    approvalRequired: true,
    comments: 8,
    escalated: false,
  },
  {
    id: "T-087",
    title: "Secure speaker bookings",
    description: "Confirm keynote schedule and finalize speaker AV requirements.",
    department: "Operations",
    assignee: "Samira Khan",
    priority: "Medium",
    status: "Review",
    dueDate: "May 15",
    dependencies: [],
    files: ["keynote-sheet.docx"],
    thread: "speaker-coord",
    approvalRequired: false,
    comments: 4,
    escalated: true,
  },
  {
    id: "T-114",
    title: "Approve vendor reimbursements",
    description: "Review invoices for catering and stage equipment purchases.",
    department: "Finance",
    assignee: "Milan Shah",
    priority: "Critical",
    status: "Todo",
    dueDate: "May 17",
    dependencies: ["T-102"],
    files: ["invoice-1294.pdf"],
    thread: "fin-reviews",
    approvalRequired: true,
    comments: 12,
    escalated: true,
  },
  {
    id: "T-123",
    title: "Finalize event social calendar",
    description: "Publish the run sheet and promotional timeline for all channels.",
    department: "PR",
    assignee: "Ryan Lee",
    priority: "High",
    status: "Todo",
    dueDate: "May 18",
    dependencies: [],
    files: ["social-calendar.xlsx"],
    thread: "promo-plan",
    approvalRequired: false,
    comments: 2,
    escalated: false,
  },
  {
    id: "T-130",
    title: "Confirm security gate assignments",
    description: "Align volunteer shifts with campus safety and emergency response plan.",
    department: "Security",
    assignee: "Liam Lewis",
    priority: "Medium",
    status: "Blocked",
    dueDate: "May 16",
    dependencies: ["T-087"],
    files: ["shift-roster.csv"],
    thread: "security-ops",
    approvalRequired: false,
    comments: 6,
    escalated: false,
  },
  {
    id: "T-138",
    title: "Design event poster suite",
    description: "Create venue signage, digital graphics, and sponsor boards.",
    department: "Creative",
    assignee: "Nina Patel",
    priority: "High",
    status: "Completed",
    dueDate: "May 14",
    dependencies: [],
    files: ["poster-suite.zip"],
    thread: "creative-review",
    approvalRequired: false,
    comments: 3,
    escalated: false,
  },
];

export const reimbursements: Reimbursement[] = [
  {
    id: "R-045",
    vendor: "Campus Cafe",
    amount: "$840",
    submittedBy: "Ryan Lee",
    department: "PR",
    status: "Pending",
    invoice: "invoice-045.pdf",
    chain: "Milan > Council",
    flagged: false,
  },
  {
    id: "R-046",
    vendor: "StageLight Co.",
    amount: "$2,940",
    submittedBy: "Ava Roy",
    department: "Tech",
    status: "Pending",
    invoice: "invoice-046.pdf",
    chain: "Milan > Management",
    flagged: true,
  },
  {
    id: "R-037",
    vendor: "Print Lab",
    amount: "$540",
    submittedBy: "Nina Patel",
    department: "Creative",
    status: "Approved",
    invoice: "invoice-037.pdf",
    chain: "Milan",
    flagged: false,
  },
];

export const files: FileItem[] = [
  { id: "F-01", name: "lighting-plan.pdf", type: "PDF", tag: "Tech", size: "2.1 MB", updated: "2h ago" },
  { id: "F-02", name: "social-calendar.xlsx", type: "Spreadsheet", tag: "PR", size: "1.2 MB", updated: "1d ago" },
  { id: "F-03", name: "invoice-046.pdf", type: "Invoice", tag: "Finance", size: "310 KB", updated: "4h ago" },
  { id: "F-04", name: "poster-suite.zip", type: "Assets", tag: "Creative", size: "18 MB", updated: "3d ago" },
  { id: "F-05", name: "emergency-plan.docx", type: "Document", tag: "Security", size: "650 KB", updated: "5h ago" },
];

export const channels: Channel[] = [
  {
    id: "stage-ops",
    name: "#stage-ops",
    description: "Stage, AV, and setup coordination.",
    department: "Tech",
    pinned: ["Lighting layout needs signoff before delivery."],
    participants: ["Ava Roy", "Samira Khan", "Milan Shah"],
    messages: [
      { id: "m1", author: "Ava Roy", content: "Need vendor invoice verified before we pose the lighting order.", time: "9:12 AM", reactions: ["✅", "👀"] },
      { id: "m2", author: "Samira Khan", content: "Confirmed the safety walk-through at 3pm today.", time: "9:34 AM" },
      { id: "m3", author: "Milan Shah", content: "Finance will release the second payment once the supplier contract is received.", time: "10:08 AM", reactions: ["💰"] },
    ],
  },
  {
    id: "fin-reviews",
    name: "#finance-approvals",
    description: "Reimbursement review and budget exceptions.",
    department: "Finance",
    pinned: ["Stage lighting invoice requires escalation.", "Vendor terms pending security signoff."],
    participants: ["Milan Shah", "Ava Roy"],
    messages: [
      { id: "m4", author: "Milan Shah", content: "We need final approval for the $2,940 stage payment.", time: "8:55 AM", reactions: ["⚠️"] },
      { id: "m5", author: "Ava Roy", content: "The technical brief is complete. Hold payment until the rigging plan is finalized.", time: "9:03 AM" },
    ],
  },
  {
    id: "promo-plan",
    name: "#promo-plan",
    description: "Announcements and press coordination.",
    department: "PR",
    pinned: ["Social calendar ready for final review."],
    participants: ["Ryan Lee", "Nina Patel"],
    messages: [
      { id: "m6", author: "Ryan Lee", content: "Need a final sign-off on the posters before we publish.", time: "7:50 AM" },
      { id: "m7", author: "Nina Patel", content: "Draft is live in the files section. Mark any copy changes here.", time: "8:05 AM", reactions: ["✍️"] },
    ],
  },
];

export const team: TeamGroup[] = [
  {
    title: "Leadership",
    members: [
      { id: "liam", name: "Liam Lewis", role: "Management", department: "Security", title: "Safety Chief", avatar: "LL" },
      { id: "milan", name: "Milan Shah", role: "Council", department: "Finance", title: "Finance Lead", avatar: "MS" },
    ],
  },
  {
    title: "Department Heads",
    members: [
      { id: "ava", name: "Ava Roy", role: "HOD", department: "Tech", title: "HOD — Tech", avatar: "AR" },
      { id: "sam", name: "Samira Khan", role: "HOD", department: "Operations", title: "Ops Head", avatar: "SK" },
    ],
  },
  {
    title: "Core Teams",
    members: [
      { id: "nina", name: "Nina Patel", role: "Core Member", department: "Creative", title: "Design Lead", avatar: "NP" },
      { id: "ryan", name: "Ryan Lee", role: "Member", department: "PR", title: "PR Executive", avatar: "RL" },
    ],
  },
];

export const notifications = [
  "Ava requested approval on vendor expense R-046",
  "New comment in #stage-ops from Samira",
  "Budget alert: Creative spending at 76%",
];

export const quickActions = [
  "Create task", "Log reimbursement", "Start thread", "Upload file", "Switch role",
];

export const supportStats = {
  totalTasks: 46,
  completedTasks: 18,
  pendingReimbursements: 7,
  remainingBudget: "$18.2K",
  activeThreads: 12,
};
