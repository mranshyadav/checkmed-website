"use client";

import { useEffect, useRef, useState } from "react";
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
  ChevronRight,
} from "lucide-react";

// ── Animated count-up (native IntersectionObserver, no deps) ──────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      const dur = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ── Dashboard mockup ──────────────────────────────────────────────────────────

type Risk = "Low" | "Medium" | "High";

const employees = [
  { name: "Priya S.",  dept: "Engineering", risk: "Low"    as Risk, score: 92, initials: "PS", color: "bg-emerald-500" },
  { name: "Rahul M.",  dept: "Finance",     risk: "Medium" as Risk, score: 71, initials: "RM", color: "bg-amber-500"  },
  { name: "Anita K.",  dept: "HR",          risk: "Low"    as Risk, score: 88, initials: "AK", color: "bg-teal-500"   },
  { name: "Deepak V.", dept: "Sales",       risk: "High"   as Risk, score: 44, initials: "DV", color: "bg-red-500"    },
];

const riskStyles: Record<Risk, string> = {
  Low:    "text-emerald-600 bg-emerald-50",
  Medium: "text-amber-600  bg-amber-50",
  High:   "text-red-600    bg-red-50",
};

const barColor: Record<Risk, string> = {
  Low:    "bg-emerald-500",
  Medium: "bg-amber-400",
  High:   "bg-red-500",
};

function Dashboard() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % employees.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Glow halo behind card */}
      <div
        className="absolute inset-x-0 -bottom-10 h-48 pointer-events-none blur-3xl opacity-30"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #14b8a6 0%, transparent 70%)" }}
      />

      {/* Left floating badge */}
      <div className="float-card absolute -left-6 sm:-left-10 xl:-left-32 top-1/4 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md px-3 py-2.5 shadow-xl">
        <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-100">
          <ShieldCheck size={14} className="text-teal-600" />
        </span>
        <div>
          <div className="text-[10px] font-bold text-slate-900 whitespace-nowrap">IPD Protected</div>
          <div className="text-[9px] text-slate-500 whitespace-nowrap">34 prevented</div>
        </div>
      </div>

      {/* Right floating badge */}
      <div className="float-card-2 absolute -right-6 sm:-right-10 xl:-right-32 bottom-1/4 z-20 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md px-3 py-2.5 shadow-xl">
        <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-100">
          <HeartPulse size={14} className="text-emerald-600" />
        </span>
        <div>
          <div className="text-[10px] font-bold text-slate-900 whitespace-nowrap">Proactive Care</div>
          <div className="text-[9px] text-slate-500 whitespace-nowrap">Before it&apos;s critical</div>
        </div>
      </div>

      {/* Main card */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_32px_80px_-12px_rgba(0,0,0,0.25)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <div className="flex-1 mx-3 h-5 rounded-md flex items-center px-3 gap-1.5 text-[10px] text-slate-400 bg-slate-200/60">
            <ShieldCheck size={9} className="text-teal-500" />
            checkmed.in/dashboard
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { Icon: TrendingDown, val: "34",  sub: "IPD prevented", iconCls: "text-teal-600",    bg: "bg-teal-50"    },
              { Icon: Users,        val: "428", sub: "covered",       iconCls: "text-blue-600",    bg: "bg-blue-50"    },
              { Icon: HeartPulse,   val: "83%", sub: "↑ 7 pts",       iconCls: "text-emerald-600", bg: "bg-emerald-50" },
            ].map(({ Icon, val, sub, iconCls, bg }) => (
              <div key={sub} className="rounded-xl p-2.5 border border-slate-100 bg-white">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mb-1.5 ${bg}`}>
                  <Icon size={12} className={iconCls} />
                </div>
                <div className="text-base font-extrabold text-slate-900 leading-none">{val}</div>
                <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{sub}</div>
              </div>
            ))}
          </div>

          {/* Risk monitor */}
          <div className="rounded-xl border border-slate-100 bg-white p-3">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-semibold text-slate-700 flex items-center gap-1.5">
                <Activity size={10} className="text-teal-500" />
                IPD Risk Monitor
              </span>
              <span className="text-[8px] text-teal-600 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1 bg-teal-50">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <div className="space-y-1.5">
              {employees.map((emp, i) => (
                <div
                  key={emp.name}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors duration-500 ${
                    i === activeIdx ? "bg-slate-50" : ""
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${emp.color} flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0`}>
                    {emp.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-semibold text-slate-700 truncate">{emp.name}</span>
                      <span className="text-[8px] text-slate-400">{emp.dept}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 h-1 rounded-full overflow-hidden bg-slate-100">
                        <div className={`h-full rounded-full transition-all duration-700 ${barColor[emp.risk]}`} style={{ width: `${emp.score}%` }} />
                      </div>
                      <span className="text-[8px] font-semibold text-slate-500 w-5 text-right">{emp.score}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${riskStyles[emp.risk]}`}>
                    {emp.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alert */}
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 border border-amber-200 bg-amber-50">
            <Bell size={11} className="text-amber-500 flex-shrink-0 animate-pulse" />
            <span className="text-[9px] text-amber-700 font-medium">
              Deepak V. flagged — IPD risk detected, consultation scheduled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────

const LOGOS = [
  "Swiggy", "Razorpay", "Groww", "Zepto", "Meesho",
  "CRED", "Urban Company", "BrowserStack", "Ola", "PhonePe",
];

function Marquee() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div className="relative overflow-hidden border-t border-slate-100 py-5">
      <div className="animate-marquee flex gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((logo, i) => (
          <span key={i} className="text-sm font-semibold text-slate-400 select-none tracking-wide">
            {logo}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
    </div>
  );
}

// ── Feature pills ─────────────────────────────────────────────────────────────

const FEATURES = [
  { Icon: ShieldCheck,   text: "IPD hospitalization cover"  },
  { Icon: Activity,      text: "Proactive risk monitoring"  },
  { Icon: Stethoscope,   text: "24/7 doctor consultations"  },
  { Icon: Pill,          text: "Medicines & diagnostics"    },
  { Icon: ClipboardList, text: "Cashless, zero paperwork"   },
  { Icon: Phone,         text: "Dedicated health helpline"  },
];

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="aurora aurora-1 -top-[20%] -left-[10%] w-[55%] h-[55%]" />
        <span className="aurora aurora-2 top-[5%] -right-[5%] w-[45%] h-[45%]" />
        <span className="aurora aurora-3 bottom-[5%] left-[15%] w-[40%] h-[40%]" />
        <div className="dot-grid absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-10 mx-auto w-full max-w-5xl">

        {/* Badge */}
        <div
          className="reveal inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 mb-8"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          Protecting 50,000+ employees across India
          <ChevronRight size={12} className="opacity-60" />
        </div>

        {/* Headline */}
        <h1
          className="reveal text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold leading-[1.04] tracking-tight text-slate-900 mb-6"
          style={{ animationDelay: "100ms" }}
        >
          Keep your team
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #06b6d4 45%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            healthy &amp; out of hospital
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="reveal text-lg sm:text-xl leading-relaxed text-slate-500 mb-8 max-w-2xl"
          style={{ animationDelay: "200ms" }}
        >
          CheckMed gives your employees{" "}
          <strong className="font-semibold text-slate-700">complete IPD protection</strong>{" "}
          and proactive healthcare — so minor issues never spiral into costly hospital admissions.
        </p>

        {/* Feature pills */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-8" style={{ animationDelay: "280ms" }}>
          {FEATURES.map(({ Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 border border-slate-200 bg-slate-100/70 hover:border-slate-300 transition-colors duration-200"
            >
              <Icon size={11} className="text-teal-500 flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mb-12" style={{ animationDelay: "360ms" }}>
          <a
            href="#get-started"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
          >
            Protect your team now
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm bg-white/60 hover:border-slate-300 hover:bg-white hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div className="reveal flex items-center justify-center mb-16" style={{ animationDelay: "440ms" }}>
          {[
            { to: 60, suffix: "%",  label: "fewer hospitalizations" },
            { to: 50, suffix: "K+", label: "employees covered"      },
            { to: 24, suffix: "/7", label: "health support"         },
          ].map(({ to, suffix, label }, i) => (
            <div
              key={label}
              className={`text-center px-6 sm:px-12 ${i > 0 ? "border-l border-slate-200" : ""}`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                <Counter to={to} suffix={suffix} />
              </div>
              <div className="text-xs text-slate-500 mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard */}
        <div className="reveal w-full" style={{ animationDelay: "520ms" }}>
          <Dashboard />
        </div>
      </div>

      {/* Trusted by + marquee */}
      <div className="relative mt-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-4">
          Trusted by teams at
        </p>
        <Marquee />
      </div>
    </section>
  );
}
