"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

// ── Shared animation variants ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.11, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ── Animated counter ─────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Dashboard mockup ─────────────────────────────────────────────────────────

type Risk = "Low" | "Medium" | "High";

const employees = [
  { name: "Priya S.",  dept: "Engineering", risk: "Low"    as Risk, score: 92, initials: "PS", color: "#10b981" },
  { name: "Rahul M.",  dept: "Finance",     risk: "Medium" as Risk, score: 71, initials: "RM", color: "#f59e0b" },
  { name: "Anita K.",  dept: "HR",          risk: "Low"    as Risk, score: 88, initials: "AK", color: "#14b8a6" },
  { name: "Deepak V.", dept: "Sales",       risk: "High"   as Risk, score: 44, initials: "DV", color: "#ef4444" },
];

const riskMeta: Record<Risk, { color: string; bg: string }> = {
  Low:    { color: "#10b981", bg: "rgba(16,185,129,0.12)"  },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
  High:   { color: "#ef4444", bg: "rgba(239,68,68,0.12)"   },
};

function Dashboard() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % employees.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Glow halo behind the card */}
      <div
        className="absolute inset-x-0 -bottom-10 h-48 pointer-events-none blur-3xl opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #14b8a6 0%, transparent 70%)" }}
      />

      {/* Left floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="float-card absolute -left-36 top-1/4 hidden xl:flex items-center gap-2.5 rounded-2xl border border-white/10 px-3 py-2.5 shadow-2xl z-20"
        style={{ background: "rgba(13,17,23,0.88)", backdropFilter: "blur(20px)" }}
      >
        <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,184,166,0.14)" }}>
          <ShieldCheck size={14} className="text-teal-400" />
        </span>
        <div>
          <div className="text-[10px] font-bold text-white whitespace-nowrap">IPD Protected</div>
          <div className="text-[9px] text-slate-400 whitespace-nowrap">34 prevented this month</div>
        </div>
      </motion.div>

      {/* Right floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="float-card-2 absolute -right-36 bottom-1/4 hidden xl:flex items-center gap-2.5 rounded-2xl border border-white/10 px-3 py-2.5 shadow-2xl z-20"
        style={{ background: "rgba(13,17,23,0.88)", backdropFilter: "blur(20px)" }}
      >
        <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.14)" }}>
          <HeartPulse size={14} className="text-emerald-400" />
        </span>
        <div>
          <div className="text-[10px] font-bold text-white whitespace-nowrap">Proactive Care</div>
          <div className="text-[9px] text-slate-400 whitespace-nowrap">Before it turns critical</div>
        </div>
      </motion.div>

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.09]"
        style={{
          background: "rgba(13,17,23,0.92)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 48px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.025)" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(248,113,113,0.65)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(251,191,36,0.65)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(74,222,128,0.65)" }} />
          <div
            className="flex-1 mx-3 h-5 rounded-md text-[10px] text-slate-500 flex items-center px-3 gap-1.5 border border-white/[0.06]"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <ShieldCheck size={9} className="text-teal-500" />
            checkmed.in/dashboard
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { Icon: TrendingDown, label: "IPD Prevented", val: "34",  sub: "this quarter", color: "#14b8a6" },
              { Icon: Users,        label: "Employees",     val: "428", sub: "active",        color: "#60a5fa" },
              { Icon: HeartPulse,   label: "Health Score",  val: "83%", sub: "↑ 7 pts",       color: "#34d399" },
            ].map(({ Icon, label, val, sub, color }) => (
              <div
                key={label}
                className="rounded-xl p-2.5 border border-white/[0.06]"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center mb-1.5"
                  style={{ background: `${color}1a` }}
                >
                  <Icon size={12} style={{ color }} />
                </div>
                <div className="text-base font-extrabold text-white leading-none">{val}</div>
                <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">{sub}</div>
              </div>
            ))}
          </div>

          {/* Risk monitor */}
          <div
            className="rounded-xl border border-white/[0.06] p-3"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity size={10} className="text-teal-400" />
                IPD Risk Monitor
              </span>
              <span className="text-[8px] text-teal-400 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1" style={{ background: "rgba(20,184,166,0.1)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <div className="space-y-1.5">
              {employees.map((emp, i) => (
                <div
                  key={emp.name}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors duration-500"
                  style={{ background: i === activeIdx ? "rgba(255,255,255,0.04)" : "transparent" }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                    style={{ background: emp.color }}
                  >
                    {emp.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-semibold text-slate-200 truncate">{emp.name}</span>
                      <span className="text-[8px] text-slate-500">{emp.dept}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${emp.score}%`, background: emp.color }}
                        />
                      </div>
                      <span className="text-[8px] font-semibold text-slate-500 w-5 text-right">{emp.score}</span>
                    </div>
                  </div>
                  <span
                    className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ color: riskMeta[emp.risk].color, background: riskMeta[emp.risk].bg }}
                  >
                    {emp.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alert banner */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <Bell size={11} className="text-amber-400 flex-shrink-0 animate-pulse" />
            <span className="text-[9px] text-amber-300 font-medium">
              Deepak V. flagged — IPD risk detected, consultation scheduled
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Marquee ──────────────────────────────────────────────────────────────────

const LOGOS = [
  "Swiggy", "Razorpay", "Groww", "Zepto", "Meesho",
  "CRED", "Urban Company", "BrowserStack", "Ola", "PhonePe",
];

function Marquee() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div className="relative overflow-hidden border-t border-white/[0.06] py-5">
      <div className="animate-marquee flex gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((logo, i) => (
          <span key={i} className="text-sm font-semibold text-slate-600 select-none tracking-wide">
            {logo}
          </span>
        ))}
      </div>
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, #030712, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, #030712, transparent)" }} />
    </div>
  );
}

// ── Feature pills ────────────────────────────────────────────────────────────

const FEATURES = [
  { Icon: ShieldCheck,   text: "IPD hospitalization cover"  },
  { Icon: Activity,      text: "Proactive risk monitoring"  },
  { Icon: Stethoscope,   text: "24/7 doctor consultations"  },
  { Icon: Pill,          text: "Medicines & diagnostics"    },
  { Icon: ClipboardList, text: "Cashless, zero paperwork"   },
  { Icon: Phone,         text: "Dedicated health helpline"  },
];

// ── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* ── Aurora background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="aurora-blob-1 absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #14b8a6, transparent 70%)", filter: "blur(100px)" }}
        />
        <div
          className="aurora-blob-2 absolute top-[5%] -right-[5%] w-[45%] h-[45%] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)", filter: "blur(100px)" }}
        />
        <div
          className="aurora-blob-3 absolute bottom-[5%] left-[15%] w-[40%] h-[40%] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", filter: "blur(90px)" }}
        />
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 opacity-[0.12]" />
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-10 mx-auto w-full max-w-5xl">

        {/* Badge pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 px-4 py-2 text-xs font-semibold text-teal-400 mb-8"
          style={{ background: "rgba(20,184,166,0.08)", backdropFilter: "blur(8px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Protecting 50,000+ employees across India
          <ChevronRight size={12} className="opacity-60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold leading-[1.04] tracking-tight text-white mb-6"
        >
          Keep your team
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #14b8a6 0%, #22d3ee 45%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            healthy &amp; out of hospital
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl leading-relaxed text-slate-400 mb-8 max-w-2xl"
        >
          CheckMed gives your employees{" "}
          <strong className="font-semibold text-slate-200">complete IPD protection</strong>{" "}
          and proactive healthcare — so minor issues never spiral into costly hospital admissions.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {FEATURES.map(({ Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 border border-white/[0.08] hover:border-white/[0.16] transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <Icon size={11} className="text-teal-400 flex-shrink-0" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <a
            href="#get-started"
            className="group relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
              boxShadow: "0 0 28px rgba(20,184,166,0.32), 0 4px 16px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 42px rgba(20,184,166,0.55), 0 8px 24px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 28px rgba(20,184,166,0.32), 0 4px 16px rgba(0,0,0,0.4)";
            }}
          >
            Protect your team now
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-slate-200 font-semibold text-sm transition-all duration-200 hover:border-white/[0.24] hover:bg-white/[0.04] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            See how it works
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-0 mb-16"
        >
          {[
            { to: 60,  suffix: "%",  label: "fewer hospitalizations" },
            { to: 50,  suffix: "K+", label: "employees covered"      },
            { to: 24,  suffix: "/7", label: "health support"         },
          ].map(({ to, suffix, label }, i) => (
            <div
              key={label}
              className="text-center px-8 sm:px-12"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : undefined,
              }}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <Counter to={to} suffix={suffix} />
              </div>
              <div className="text-xs text-slate-500 mt-1.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard visual */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <Dashboard />
        </motion.div>
      </div>

      {/* Trusted by + marquee */}
      <div className="relative mt-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600 mb-4">
          Trusted by teams at
        </p>
        <Marquee />
      </div>
    </section>
  );
}
