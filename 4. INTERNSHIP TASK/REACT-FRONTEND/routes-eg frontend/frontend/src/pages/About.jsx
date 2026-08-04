import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-24">
      <div className="mx-auto max-w-6xl rounded-4xl border border-slate-800/70 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
          <div className="space-y-6 text-slate-100">
            <span className="inline-flex rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              About the UI
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">A refreshed design for sharper interaction.</h1>
            <p className="max-w-3xl text-slate-400 sm:text-lg">
              This frontend now uses brighter gradients, more breathing room, and consistent visual styling across pages to feel both modern and welcoming.
            </p>
            <div className="space-y-4">
              <Bullet text="Improved navigation with glowing active states." />
              <Bullet text="Stronger visual hierarchy and card treatments." />
              <Bullet text="A cleaner welcome page with direction and action." />
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Back to Home
            </button>
          </div>

          <div className="space-y-6">
            <StatCard value="95%" label="Visual polish" />
            <StatCard value="80ms" label="Fast page feel" />
            <StatCard value="100%" label="Responsive design" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Bullet = ({ text }) => (
  <div className="flex items-start gap-3 text-slate-300">
    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
    <p>{text}</p>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="rounded-4xl border border-slate-800/80 bg-slate-950/90 p-6 text-slate-200 shadow-xl shadow-slate-950/20">
    <p className="text-4xl font-bold text-white">{value}</p>
    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{label}</p>
  </div>
);

export default About;
