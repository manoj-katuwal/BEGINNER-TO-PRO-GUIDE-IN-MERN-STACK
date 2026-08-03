import React from "react";

const Admin = () => {
  return (
    <section className="pt-24">
      <div className="mx-auto max-w-4xl rounded-4xl border border-slate-700/70 bg-slate-950/80 p-10 text-slate-100 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-4 text-slate-400">
          This protected route is ready for admin controls. Add statistics, user panels, or management actions here.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <StatCard label="Users" value="1,240" />
          <StatCard label="Active Sessions" value="312" />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 text-slate-200 shadow-lg shadow-slate-950/20">
    <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
  </div>
);

export default Admin;
