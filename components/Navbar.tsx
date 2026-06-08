"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Menu, X, ArrowRight } from "lucide-react";

const NAV_LINKS = ["How it works", "Benefits", "For HR", "Pricing", "Blog"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-teal-500 to-cyan-500">
            <ShieldCheck size={16} className="text-white" />
          </span>
          <span className="font-extrabold text-lg tracking-tight text-slate-900">CheckMed</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="#get-started"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-teal-500/25"
          >
            Get started
            <ArrowRight size={13} />
          </a>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 px-6 pb-6 pt-3 bg-white/95 backdrop-blur-xl">
          <div className="space-y-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="block py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border-b border-slate-100 last:border-0 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href="#get-started"
            className="block mt-4 text-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500"
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </a>
        </div>
      )}
    </header>
  );
}
