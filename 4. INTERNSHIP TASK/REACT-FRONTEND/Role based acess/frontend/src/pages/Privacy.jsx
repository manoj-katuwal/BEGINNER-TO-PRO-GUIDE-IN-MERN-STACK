import React from 'react';

const Privacy = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white shadow-sm rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
        </p>
        <div className="space-y-4 text-slate-700">
          <p className="font-semibold">Information we collect</p>
          <p>We may collect basic details such as your name, email address, and browsing activity to improve your experience.</p>
          <p className="font-semibold">How we use it</p>
          <p>Data is used to personalize your visit, respond to inquiries, and support our service improvements.</p>
          <p className="font-semibold">Your control</p>
          <p>You can request data updates or deletion by contacting our support team.</p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
