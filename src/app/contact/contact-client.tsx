"use client";

/**
 * Page-local client pieces for /contact/ (DESIGN_DIRECTION 8.11).
 *
 * Web3FormsFallback: the small native fallback form (name, phone, message)
 * below the JotForm shell. Placeholder access key constant per 7.4; mailto
 * and tel work day one regardless. Fires form_open{form:"web3forms"} on
 * first interaction; success state uses led-500 (licensed for open-now and
 * form success only).
 *
 * SocialRow: mono social links for the phone rail; the TikTok outbound
 * link fires tiktok_out like the footer's.
 */

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import {
  EMAIL,
  EMAIL_MAILTO,
  EV,
  SOCIALS,
  WEB3FORMS_ACCESS_KEY,
} from "@/lib/constants";
import { TelText } from "@/components/Button";

export function SocialRow({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {SOCIALS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mono-cap text-(--link) uppercase underline decoration-1 underline-offset-4"
            onClick={() => {
              if ("tiktok" in s && s.tiktok) track(EV.TIKTOK_OUT);
            }}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

type SendState = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "mt-2 w-full rounded-[4px] border border-(--hairline) bg-transparent px-3.5 py-2.5 text-body";

export function Web3FormsFallback({ className }: { className?: string }) {
  const [state, setState] = useState<SendState>("idle");
  const opened = useRef(false);

  const markOpen = () => {
    if (opened.current) return;
    opened.current = true;
    track(EV.FORM_OPEN, { form: "web3forms" });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    /* Honeypot: bots fill the hidden field; people never see it. */
    if (data.get("botcheck")) return;
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New message from the hcng.net contact page",
          name: data.get("name"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        form.reset();
        setState("sent");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <div
      className={cn(
        "rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 sm:p-8",
        className,
      )}
    >
      <h3 className="text-h3s">Prefer a shorter form?</h3>
      <p className="text-body mt-2 text-(--muted)">
        Name, phone, and a quick note. We will call you back.
      </p>
      {state === "sent" ? (
        <p role="status" className="text-mono-label mt-6 flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-led-500"
          />
          <span>Message sent. We will call you.</span>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6">
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="text-mono-label">
                Name
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                onFocus={markOpen}
                className={FIELD_CLASS}
              />
            </div>
            <div>
              <label htmlFor="cf-phone" className="text-mono-label">
                Phone
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                onFocus={markOpen}
                className={FIELD_CLASS}
              />
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="cf-message" className="text-mono-label">
              Message
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={4}
              onFocus={markOpen}
              className={FIELD_CLASS}
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            className="btn text-mono-label mt-6 inline-flex min-h-10 items-center justify-center rounded-[4px] bg-teal-500 px-4 py-2 text-center text-paper-50 transition-colors duration-150 hover:bg-teal-600 active:bg-teal-600 disabled:opacity-60"
          >
            {state === "sending" ? "Sending" : "Send"}
          </button>
          {state === "error" && (
            <p role="alert" className="text-body mt-4">
              The form did not send. Call <TelText location="body" /> or email{" "}
              <a
                href={EMAIL_MAILTO}
                className="text-(--link) underline decoration-1 underline-offset-4"
              >
                {EMAIL}
              </a>
              .
            </p>
          )}
        </form>
      )}
    </div>
  );
}
