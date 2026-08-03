import React from "react";

const Testonomials = () => {
  return (
    <section className="pt-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-4xl border border-slate-700/70 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Testimonials</p>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">What people say about the interface</h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Real-looking user feedback helps reinforce the polished layout and shows the design is built to feel trustworthy and modern.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <TestimonialCard
            quote="The experience feels premium and easy to navigate — the layout is both bold and calm."
            name="Maya R."
            role="Product Designer"
          />
          <TestimonialCard
            quote="Loved the clean controls and the active nav states. It makes everything feel much more reliable."
            name="Jason K."
            role="Frontend Developer"
          />
          <TestimonialCard
            quote="The visual style is attractive without being overwhelming. Great spacing and subtle glass effects."
            name="Amina S."
            role="UI Specialist"
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, name, role }) => (
  <article className="rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-8 text-slate-200 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-500/50">
    <p className="text-lg leading-8 text-slate-300">“{quote}”</p>
    <div className="mt-6 space-y-1">
      <p className="font-semibold text-white">{name}</p>
      <p className="text-sm text-slate-400">{role}</p>
    </div>
  </article>
);

export default Testonomials;
