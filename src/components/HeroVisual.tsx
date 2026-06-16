import { CircuitBoard, Award } from "lucide-react";
import { DOMAINS } from "@/lib/constants";

const FLOATING_SLUGS = ["fullstack", "datascience", "aiml", "uiux", "python", "java", "cybersecurity"];
const FLOATING_POSITIONS = [
  { delay: "animate-float-3", cls: "-top-8 -left-36" },
  { delay: "animate-float", cls: "top-4 -right-36" },
  { delay: "animate-float-2", cls: "top-24 -left-32" },
  { delay: "animate-float-4", cls: "top-28 -right-32" },
  { delay: "animate-float-5", cls: "top-56 -left-34" },
  { delay: "animate-float-3", cls: "top-60 -right-30" },
  { delay: "animate-float", cls: "-bottom-1 -left-28" },
];

export function HeroVisual() {
  return (
    <div className="relative">
      <div className="relative mx-auto w-full max-w-lg">
        {/* Dashboard Preview */}
        <div className="relative z-10 overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-xs font-bold text-white">S</div>
              <span className="text-sm font-semibold text-gray-900">Skyrovix</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
          </div>

          <div className="p-6">
            {/* Welcome Card */}
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Welcome back,</p>
                  <p className="text-xl font-bold">Intern 👋</p>
                </div>
                <div className="grid size-12 place-items-center rounded-xl bg-white/20">
                  <Award className="size-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Internship Progress</span>
                  <span>3/5 tasks</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[60%] rounded-full bg-white transition-all" />
                </div>
              </div>
            </div>

            {/* Row: Certificate + Timeline */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              {/* Certificate Card */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-lg bg-amber-50">
                    <Award className="size-3.5 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-md border border-gray-200 bg-white p-1">
                    <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#eee_2px,#eee_4px)]" />
                  </div>
                  <div className="text-[10px] text-gray-500">
                    <p className="font-medium text-gray-700">QR Verified</p>
                    <p>Issued on completion</p>
                  </div>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-lg bg-blue-50">
                    <CircuitBoard className="size-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">Journey</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { done: true, label: "Applied" },
                    { done: true, label: "Offer Letter" },
                    { done: true, label: "Task 1/5" },
                    { done: false, label: "Task 2/5" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className={`size-1.5 rounded-full ${s.done ? "bg-green-500" : "bg-gray-200"}`} />
                      <span className={`text-[10px] ${s.done ? "text-gray-700" : "text-gray-400"}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Tags */}
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-900">Trending Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Node.js", "Python", "TypeScript", "SQL", "Docker"].map((s) => (
                  <span key={s} className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Domain Cards */}
        {FLOATING_SLUGS.map((slug, i) => {
          const d = DOMAINS.find((x) => x.slug === slug);
          if (!d) return null;
          return (
            <div
              key={d.slug}
              className={`${FLOATING_POSITIONS[i].delay} ${FLOATING_POSITIONS[i].cls} absolute z-20 hidden md:block`}
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-lg shadow-blue-900/5 backdrop-blur">
                <div className={`grid size-8 place-items-center rounded-lg bg-gradient-to-br ${d.color} text-xs font-bold text-white`}>
                  {d.icon}
                </div>
                <span className="whitespace-nowrap text-xs font-medium text-gray-800">{d.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
