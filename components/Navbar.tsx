"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = ["How it works", "Benefits", "For HR", "Pricing", "Blog"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(3,7,18,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #14b8a6, #06b6d4)" }}
          >
            <ShieldCheck size={16} className="text-white" />
          </span>
          <span className="font-extrabold text-lg text-white tracking-tight">CheckMed</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="#get-started"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
              boxShadow: "0 0 18px rgba(20,184,166,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(20,184,166,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(20,184,166,0.25)";
            }}
          >
            Get started
            <ArrowRight size={13} />
          </a>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.06] px-6 pb-6 pt-3"
            style={{ background: "rgba(3,7,18,0.96)", backdropFilter: "blur(24px)" }}
          >
            <div className="space-y-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block py-3 text-sm font-medium text-slate-300 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
            <a
              href="#get-started"
              className="block mt-4 text-center px-4 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #14b8a6, #06b6d4)" }}
              onClick={() => setMenuOpen(false)}
            >
              Get started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
