import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="pt-24">
      <div className="mx-auto max-w-3xl rounded-4xl border border-slate-700/70 bg-slate-950/80 p-10 text-slate-100 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">404 error</p>
        <h1 className="mt-4 text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you were looking for doesn’t exist or may have moved.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Return home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
