import React from "react";

const Contact = () => {
  return (
    <section className="pt-24">
      <div className="mx-auto max-w-4xl rounded-4xl border border-slate-700/70 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-12">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-white">Contact</h2>
          <p className="max-w-2xl text-slate-400">
            Want to connect or share feedback? Reach out with the details below and let’s keep the front-end experience polished.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ContactCard label="Email" value="hello@routewave.app" />
          <ContactCard label="Phone" value="+1 (555) 123-4567" />
          <ContactCard label="Location" value="Remote / Anywhere" />
          <ContactCard label="Support" value="support@routewave.app" />
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ label, value }) => (
  <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 text-slate-200 shadow-lg shadow-slate-950/20">
    <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{label}</p>
    <p className="mt-3 text-lg font-semibold text-white">{value}</p>
  </div>
);

export default Contact;
