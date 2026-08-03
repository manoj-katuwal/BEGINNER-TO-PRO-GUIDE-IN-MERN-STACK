import React from 'react';

const Terms = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white shadow-sm rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          Welcome to Farm Root. These terms govern your use of our website and services. By using our platform, you agree to these terms.
        </p>
        <div className="space-y-4 text-slate-700">
          <p className="font-semibold">Use of service</p>
          <p>Use our site responsibly and follow all applicable laws and policies.</p>
          <p className="font-semibold">Account responsibility</p>
          <p>Keep your account information secure and do not share your login details with others.</p>
          <p className="font-semibold">Service changes</p>
          <p>We may update features or services at any time. Continued use constitutes acceptance of changes.</p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
