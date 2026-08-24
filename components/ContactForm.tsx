"use client";

import { useRef, useState } from "react";
import type { ContactFormCopy } from "@/lib/content/contact";
import { company } from "@/lib/data";
import { localeShort, type Locale } from "@/lib/i18n";

/** Field labels double as the labels in the e-mail body — one set, no drift. */
function compose(form: HTMLFormElement, copy: ContactFormCopy) {
  const data = new FormData(form);
  const get = (key: string) => data.get(key)?.toString().trim() || copy.blank;
  return [
    copy.bodyTitle,
    "",
    `${copy.name.label}: ${get("name")}`,
    `${copy.company.label}: ${get("company")}`,
    `${copy.contact.label}: ${get("contact")}`,
    `${copy.city.label}: ${get("city")}`,
    `${copy.grade.label}: ${get("grade")}`,
    `${copy.volume.label}: ${get("volume")}`,
    "",
    `${copy.message.label}:`,
    get("message"),
  ].join("\n");
}

export default function ContactForm({ lang, copy }: { lang: Locale; copy: ContactFormCopy }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");

  function say(msg: string) {
    setMessage(msg);
    window.setTimeout(() => setMessage(""), 4000);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const contact = form.elements.namedItem("contact") as HTMLInputElement;
    if (!contact.value.trim()) {
      contact.focus();
      say(copy.errContact);
      return;
    }
    const href =
      `mailto:${company.email}` +
      // The locale tag tells the sales desk which language to answer in.
      `?subject=${encodeURIComponent(`${copy.subject} · ${localeShort[lang]}`)}` +
      `&body=${encodeURIComponent(compose(form, copy))}`;
    window.location.href = href;
    say(copy.toastMail);
  }

  async function handleCopy() {
    const form = formRef.current;
    if (!form) return;
    try {
      await navigator.clipboard.writeText(compose(form, copy));
      say(copy.toastCopied);
    } catch {
      say(copy.toastCopyFailed);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="f2">
        <div className="fld">
          <label htmlFor="f-name">{copy.name.label}</label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            placeholder={copy.name.placeholder}
          />
        </div>
        <div className="fld">
          <label htmlFor="f-comp">{copy.company.label}</label>
          <input
            id="f-comp"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder={copy.company.placeholder}
          />
        </div>
      </div>
      <div className="f2">
        <div className="fld">
          <label htmlFor="f-mail">{copy.contact.label}</label>
          <input
            id="f-mail"
            name="contact"
            type="text"
            autoComplete="email"
            maxLength={120}
            placeholder={copy.contact.placeholder}
          />
        </div>
        <div className="fld">
          <label htmlFor="f-city">{copy.city.label}</label>
          <input
            id="f-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            maxLength={80}
            placeholder={copy.city.placeholder}
          />
        </div>
      </div>
      <div className="f2">
        <div className="fld">
          <label htmlFor="f-grade">{copy.grade.label}</label>
          <select id="f-grade" name="grade">
            {copy.grade.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label htmlFor="f-vol">{copy.volume.label}</label>
          <select id="f-vol" name="volume">
            {copy.volume.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="fld">
        <label htmlFor="f-msg">{copy.message.label}</label>
        {/* Capped: the whole form is encoded into a mailto: URL, and mail
            clients silently truncate or refuse links past a few thousand
            characters. 1200 leaves room for the labelled fields above. */}
        <textarea
          id="f-msg"
          name="message"
          maxLength={1200}
          placeholder={copy.message.placeholder}
        />
      </div>
      <div className="btn-row mt-[0.3rem]">
        <button className="btn btn--onband" type="submit">
          {copy.submit}
        </button>
        <button className="btn btn--onband-ghost" type="button" onClick={handleCopy}>
          {copy.copy}
        </button>
      </div>
      <p className={`toast${message ? " on" : ""}`} role="status" aria-live="polite">
        {message}
      </p>
      <p className="form-note">{copy.note}</p>
    </form>
  );
}
