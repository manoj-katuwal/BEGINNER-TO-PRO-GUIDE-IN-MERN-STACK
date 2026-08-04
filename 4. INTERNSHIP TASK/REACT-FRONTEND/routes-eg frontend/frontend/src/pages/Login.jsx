import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("role", role);
    setMessage(`Welcome ${name || "guest"}, your role is set to ${role || "visitor"}.`);
  };

  return (
    <section className="pt-24">
      <div className="mx-auto max-w-3xl rounded-4xl border border-slate-700/70 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-12">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Login</p>
          <h1 className="text-3xl font-bold text-white">Sign in to continue</h1>
          <p className="max-w-2xl text-slate-400">
            Enter your name and choose your role to experience protected routes and admin access in the demo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
          <label className="space-y-2 text-slate-200">
            <span className="text-sm font-medium">Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
            />
          </label>

          <label className="space-y-2 text-slate-200">
            <span className="text-sm font-medium">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500"
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Cashier">Cashier</option>
              <option value="Guest">Guest</option>
            </select>
          </label>

          <button className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" type="submit">
            Save role
          </button>
        </form>

        {message && <div className="mt-6 rounded-3xl bg-slate-900/90 px-5 py-4 text-slate-200 shadow-inner shadow-slate-950/20">{message}</div>}
      </div>
    </section>
  );
};

export default Login;
