import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* Floating Label Input */
function FloatInput({ id, label, type = 'text', name, value, onChange, required }) {
  return (
    <div className="form-float">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-float-input"
        placeholder=" "
        required={required}
        autoComplete="off"
      />
      <label htmlFor={id} className="form-float-label">{label}{required && ' *'}</label>
    </div>
  );
}

/* Floating Label Textarea */
function FloatTextarea({ id, label, name, value, onChange, required, rows = 5 }) {
  return (
    <div className="form-float">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-float-input"
        placeholder=" "
        required={required}
        rows={rows}
      />
      <label htmlFor={id} className="form-float-label">{label}{required && ' *'}</label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }

    const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!key) {
      setError('Web3Forms access key is missing in .env file.');
      return;
    }

    setSending(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio message from ${form.name}`,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Message sent! I\'ll get back to you within 24 hours.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open to freelance projects, full-time roles, and collaboration opportunities
          </p>
        </div>

        <div className="contact-grid">
          {/* ── Left: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="availability-badge">
              <span className="availability-dot" />
              Available for Freelance &amp; Full-time
            </div>

            <h3 className="contact-info-title">Get in touch</h3>
            <p className="contact-info-desc">
              Whether you have a project idea, a job opportunity, or just want to say hi — my inbox is always open!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <a href="mailto:katwalmanoj67@gmail.com" className="contact-item-value">
                    katwalmanoj67@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <a href="tel:+9779804064003" className="contact-item-value">
                    +977 9804064003
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <span className="contact-item-value">Dharan, Sunsari, Nepal</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/manojctrl" target="_blank" rel="noopener noreferrer"
                className="social-link" aria-label="GitHub profile">
                <GithubIcon />
              </a>
              <a href="https://www.linkedin.com/in/manoj-katuwal-2636a239a/" target="_blank" rel="noopener noreferrer"
                className="social-link" aria-label="LinkedIn profile">
                <LinkedinIcon />
              </a>
              <a href="mailto:katwalmanoj67@gmail.com" className="social-link" aria-label="Send email">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            noValidate
          >
            {error   && <div className="form-alert form-alert-error"   role="alert">{error}</div>}
            {success && <div className="form-alert form-alert-success" role="status">{success}</div>}

            <div className="form-row">
              <FloatInput id="name"  label="Your Name"  name="name"  value={form.name}  onChange={handleChange} required />
              <FloatInput id="email" label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <FloatInput id="subject" label="Subject" name="subject" value={form.subject} onChange={handleChange} />

            <FloatTextarea id="message" label="Your Message" name="message" value={form.message} onChange={handleChange} required rows={5} />

            <button
              type="submit"
              disabled={sending}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {sending ? 'Sending…' : 'Send Message'}
              <Send size={17} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}