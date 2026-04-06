"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Left ── */}
        <div className={styles.left}>
          <span className={styles.label}>Contact</span>
          <h2 className={styles.title}>Let's talk about your future home.</h2>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Leave your details and we'll get back to you within 24 hours to
            discuss the property, arrange a viewing, or answer any questions.
          </p>
        </div>

        {/* ── Right: form ── */}
        <div>
          {sent ? (
            <p className={styles.success}>
              Thank you. We'll be in touch shortly.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>First name</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Last name</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Phone</label>
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="+1 000 000 0000"
                  />
                </div>
              </div>

              <button type="submit" className={styles.submit}>
                Send message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
