import React from 'react';

const Support = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white shadow-sm rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Support</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          Need help? Our support team is here to assist you with orders, product questions, and account requests.
        </p>
        <div className="space-y-4 text-slate-700">
          <p className="font-semibold">Email support</p>
          <p>Reach out at support@farmroot.com and we’ll respond as soon as possible.</p>
          <p className="font-semibold">Phone support</p>
          <p>Call us at +1 (555) 123-4567 during business hours.</p>
          <p className="font-semibold">Help center</p>
          <p>We’re continuously improving our site and are happy to answer your questions.</p>
        </div>
      </div>
    </section>
  );
};

export default Support;
