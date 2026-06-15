"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  HeartPulse,
  Activity,
  ArrowRight,
  TrendingDown,
  Users,
  Bell,
  Stethoscope,
  Pill,
  ClipboardList,
  Phone,
} from "lucide-react";

// ── Animated health dashboard mockup ─────────────────────────────────────────

function HealthDashboard() {
  const [activeIdx, setActiveIdx] = useState(0);

  const employees = [
    { name: "Priya S.",  dept: "Engineering", risk: "Low",    score: 92, initials: "PS", color: "bg-emerald-500" },
    { name: "Rahul M.",  dept: "Finance",     risk: "Medium", score: 71, initials: "RM", color: "bg-amber-500"  },
    { name: "Anita K.",  dept: "HR",          risk: "Low",    score: 88, initials: "AK", color: "bg-teal-500"   },
    { name: "Deepak V.", dept: "Sales",       risk: "High",   score: 44, initials: "DV", color: "bg-red-500"    },
  ] as const;

  type Risk = "Low" | "Medium" | "High";

  const riskStyles: Record<Risk, string> = {
    Low:    "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50",
    Medium: "text-amber-600  bg-amber-50  dark:text-amber-400  dark:bg-amber-950/50",
    High:   "text-red-600    bg-red-50    dark:text-red-400    dark:bg-red-950/50",
  };

  const barColor: Record<Risk, string> = {
    Low:    "bg-emerald-500",
    Medium: "bg-amber-400",
    High:   "bg-red-500",
  };

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % employees.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-[460px] mx-auto select-none">
      {/* Browser chrome */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_24px_64px_-8px_rgba(0,0,0,0.18)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-3 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] text-slate-400 flex items-center px-3 gap-1.5">
            <ShieldCheck size={9} className="text-teal-500" />
            checkmed.in/dashboard
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { Icon: TrendingDown, label: "IPD Cases Prevented", val: "34",  sub: "this quarter",  iconCls: "text-teal-600 dark:text-teal-400",    bgCls: "bg-teal-50 dark:bg-teal-950/40"    },
              { Icon: Users,        label: "Employees Covered",   val: "428", sub: "active",        iconCls: "text-blue-600 dark:text-blue-400",    bgCls: "bg-blue-50 dark:bg-blue-950/40"    },
              { Icon: HeartPulse,   label: "Avg Health Score",    val: "83",  sub: "↑ 7 pts",       iconCls: "text-emerald-600 dark:text-emerald-400", bgCls: "bg-emerald-50 dark:bg-emerald-950/40" },
            ].map(({ Icon, label, val, sub, iconCls, bgCls }) => (
              <div key={label} className="rounded-xl border border-slate-100 dark:border-slate-800 p-2.5 bg-white dark:bg-slate-900">
                <div className={`w-6 h-6 rounded-lg ${bgCls} flex items-center justify-center mb-1.5`}>
                  <Icon size={12} className={iconCls} />
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">{val}</div>
                <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{sub}</div>
              </div>
            ))}
          </div>

          {/* IPD Risk Monitor */}
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Activity size={10} className="text-teal-500" />
                IPD Risk Monitor
              </span>
              <span className="text-[8px] text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-1.5 py-0.5 rounded-full font-medium">
                Live
              </span>
            </div>

            <div className="space-y-1.5">
              {employees.map((emp, i) => (
                <div
                  key={emp.name}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-500 ${
                    i === activeIdx ? "bg-slate-50 dark:bg-slate-800/60" : ""
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${emp.color} flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0`}>
                    {emp.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-semibold text-slate-700 dark:text-slate-200 truncate">{emp.name}</span>
                      <span className="text-[8px] text-slate-400">{emp.dept}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 h-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${barColor[emp.risk as Risk]}`}
                          style={{ width: `${emp.score}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-semibold text-slate-500 dark:text-slate-400 w-5 text-right">{emp.score}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${riskStyles[emp.risk as Risk]}`}>
                    {emp.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alert */}
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 px-3 py-2">
            <Bell size={11} className="text-amber-500 flex-shrink-0" />
            <span className="text-[9px] text-amber-700 dark:text-amber-400 font-medium">
              Deepak V. flagged for proactive consultation — IPD risk detected
            </span>
          </div>
        </div>
      </div>

      {/* Floating badge — left */}
      <div
        className="absolute -left-6 top-1/3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg px-3 py-2.5 flex items-center gap-2.5 animate-[float_4s_ease-in-out_infinite]"
        style={{ animationDelay: "0s" }}
      >
        <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center flex-shrink-0">
          <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
        </span>
        <div>
          <div className="text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap">IPD Protected</div>
          <div className="text-[9px] text-slate-400">Hospitalizations prevented</div>
        </div>
      </div>

      {/* Floating badge — right */}
      <div
        className="absolute -right-6 bottom-1/3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg px-3 py-2.5 flex items-center gap-2.5 animate-[float_4s_ease-in-out_infinite]"
        style={{ animationDelay: "1.4s" }}
      >
        <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
          <HeartPulse size={14} className="text-emerald-600 dark:text-emerald-400" />
        </span>
        <div>
          <div className="text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap">Proactive Care</div>
          <div className="text-[9px] text-slate-400">Before it becomes critical</div>
        </div>
      </div>
    </div>
  );
}

// ── Feature pills data ────────────────────────────────────────────────────────

const FEATURES = [
  { Icon: ShieldCheck,   text: "IPD hospitalization protection" },
  { Icon: Activity,      text: "Proactive risk monitoring"       },
  { Icon: Stethoscope,   text: "Doctor consultations, 24/7"      },
  { Icon: Pill,          text: "Medicines & diagnostics covered"  },
  { Icon: ClipboardList, text: "Cashless claims, zero paperwork"  },
  { Icon: Phone,         text: "Dedicated employee helpline"      },
];

const TRUST_LOGOS = ["Swiggy", "Razorpay", "Groww", "Zepto", "Meesho"];

// ── Hero section ──────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-400/10 dark:bg-teal-500/8 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-500/8 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-14 lg:gap-20 items-center">

          {/* LEFT: Copy */}
          <div className="text-center lg:text-left">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-200 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-7 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "0ms" }}
            >
              <HeartPulse size={12} />
              Employee Health Benefits · Proactive &amp; Comprehensive
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 dark:text-white mb-6 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "80ms" }}
            >
              Stop{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                  hospitalizations
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 6 Q75 2 150 5 Q225 8 298 4" stroke="url(#ul)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="ul" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#14b8a6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {" "}before they happen
            </h1>

            {/* Sub-headline */}
            <p
              className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "160ms" }}
            >
              CheckMed gives your employees{" "}
              <strong className="font-semibold text-slate-700 dark:text-slate-200">complete IPD protection</strong>{" "}
              and proactive healthcare — so minor issues never become costly hospital admissions.
            </p>

            {/* Feature pills */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-9 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "220ms" }}
            >
              {FEATURES.map(({ Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700"
                >
                  <Icon size={11} className="text-teal-500 flex-shrink-0" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "300ms" }}
            >
              <a
                href="#get-started"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                Protect your team now
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                See how it works
              </a>
            </div>

            {/* Stats */}
            <div
              className="flex items-center justify-center lg:justify-start gap-6 pt-7 border-t border-slate-100 dark:border-slate-800 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "380ms" }}
            >
              {[
                { value: "60%",  label: "fewer hospitalizations" },
                { value: "50K+", label: "employees covered"      },
                { value: "24/7", label: "health support"         },
              ].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Trusted by */}
            <div
              className="mt-8 animate-[fadeUp_0.6s_ease-out_both]"
              style={{ animationDelay: "440ms" }}
            >
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 text-center lg:text-left font-medium tracking-wide uppercase">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2">
                {TRUST_LOGOS.map((logo) => (
                  <span key={logo} className="text-sm font-bold text-slate-300 dark:text-slate-600 select-none">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Dashboard */}
          <div
            className="relative hidden lg:block animate-[fadeUp_0.6s_ease-out_both]"
            style={{ animationDelay: "200ms" }}
          >
            <HealthDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
