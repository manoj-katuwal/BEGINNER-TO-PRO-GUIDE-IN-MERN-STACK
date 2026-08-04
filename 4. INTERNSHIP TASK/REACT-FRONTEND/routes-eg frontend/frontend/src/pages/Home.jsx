import React from "react";
import { FaRocket, FaShieldAlt, FaPalette, FaSparkles } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="pt-24">
      <div className="relative overflow-hidden rounded-5xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.18),_transparent_20%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="space-y-6 text-slate-100 lg:w-1/2">
            <span className="inline-flex rounded-full bg-fuchsia-500/15 px-4 py-2 text-sm font-semibold text-fuchsia-300 uppercase tracking-[0.35em]">
              New UI Refresh
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              A brighter, more dynamic frontend experience.
            </h1>
            <p className="max-w-2xl text-slate-300 sm:text-lg">
              Navigate through polished pages, lively cards, and clear actions built for modern web browsing.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:opacity-90"
              >
                Start now
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-500 hover:text-white"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-1/2">
            <FeatureCard icon={<FaRocket />} title="Fast navigation" description="Routes feel clean, with clear active states and responsive layout." />
            <FeatureCard icon={<FaPalette />} title="Fresh look" description="A bold gradient palette with glass-like card surfaces and premium spacing." />
            <FeatureCard icon={<FaShieldAlt />} title="Built for clarity" description="High contrast, easy reading, and a polished page structure." />
            <FeatureCard icon={<FaSparkles />} title="Refined details" description="Smooth hover transitions and subtle visual depth across the UI." />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="rounded-4xl border border-slate-800/90 bg-slate-950/90 p-6 text-slate-200 shadow-xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-cyan-500/40">
    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-cyan-300 shadow-inner shadow-cyan-500/10">
      {icon}
    </div>
    <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
  </div>
);

export default Home;
