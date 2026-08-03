import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <section className="pt-24">
      <div className="mx-auto max-w-3xl rounded-4xl border border-rose-500/20 bg-slate-950/80 p-10 text-slate-100 shadow-2xl shadow-rose-500/10 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white">Unauthorized</h1>
        <p className="mt-4 text-slate-400">You don’t have access to this page. Sign in with the correct role to continue.</p>
        <Link
          to="/login"
          className="mt-8 inline-flex rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-400"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
};

export default Unauthorized;
