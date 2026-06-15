"use client";

import { useState, useEffect } from "react";
import { HeartPulse, Menu, X, Moon, Sun } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const links = ["How it works", "Benefits", "For HR", "Pricing", "Blog"];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 font-extrabold text-lg text-slate-900 dark:text-white">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md">
            <HeartPulse size={16} className="text-white" />
          </span>
          CheckMed
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
              {l}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#get-started"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md"
          >
            Get started
          </a>

          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 px-6 pb-5 pt-2 space-y-1">
          {links.map((l) => (
            <a key={l} href="#" className="block py-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium border-b border-slate-50 dark:border-slate-800/60 last:border-0">
              {l}
            </a>
          ))}
          <a href="#get-started" className="block mt-3 w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold">
            Get started
          </a>
        </div>
      )}
    </header>
  );
}
