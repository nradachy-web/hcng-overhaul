"use client";

/**
 * The online new patient intake: five steps, one question set (fields.ts),
 * answers held in sessionStorage so a patient can leave and come back on
 * the same phone. On "Send", the PDF is built in the browser (pdf.ts) and
 * posted to the office through the Modern Apex intake relay; if the relay
 * is not configured or fails, the patient still gets the PDF to download or
 * print and bring in, so the form never dead-ends. Answers are cleared once
 * the PDF exists. Nothing is stored on the site.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { EV, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { Eyebrow, Rule } from "@/components/Band";
import { SequenceCrescent } from "@/components/BrassDial";
import { TelText } from "@/components/Button";
import {
  STEPS,
  ageFromDob,
  missingRequired,
  sectionById,
  visibleFields,
  type Answers,
  type Field,
} from "./fields";

const STORAGE_KEY = "hcng_intake_v1";
const RELAY = process.env.NEXT_PUBLIC_INTAKE_ENDPOINT || "";
const TOKEN = process.env.NEXT_PUBLIC_INTAKE_TOKEN || "";

const FIELD =
  "mt-2 w-full rounded-[4px] border border-(--hairline) bg-transparent px-3.5 py-2.5 text-body";
const CHOICE =
  "flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-(--hairline) px-3.5 py-2.5 text-body has-checked:border-teal-600 has-checked:bg-teal-600/10";

type Status = "idle" | "building" | "sending" | "sent" | "fallback";

function loadAnswers(): Answers {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Answers;
  } catch {
    /* storage unavailable */
  }
  return {};
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  const id = `f-${field.key}`;
  const label = (
    <span className="text-mono-label">
      {field.label}
      {field.required && <span className="text-(--brass)"> *</span>}
    </span>
  );

  if (field.kind === "checks") {
    const chosen = Array.isArray(value) ? value : [];
    return (
      <fieldset>
        <legend>{label}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {(field.options ?? []).map((o) => (
            <label key={o} className={CHOICE}>
              <input
                type="checkbox"
                name={field.key}
                value={o}
                checked={chosen.includes(o)}
                onChange={(e) =>
                  onChange(e.target.checked ? [...chosen, o] : chosen.filter((x) => x !== o))
                }
                className="h-4 w-4 accent-teal-600"
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.kind === "radio" || field.kind === "yesno") {
    const opts = field.kind === "yesno" ? ["Yes", "No"] : (field.options ?? []);
    const many = opts.length > 5;
    return (
      <fieldset>
        <legend>{label}</legend>
        <div className={cn("mt-2 grid gap-2", many ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-2 sm:flex sm:flex-wrap")}>
          {opts.map((o) => (
            <label key={o} className={CHOICE}>
              <input
                type="radio"
                name={field.key}
                value={o}
                checked={value === o}
                onChange={() => onChange(o)}
                className="h-4 w-4 accent-teal-600"
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.kind === "textarea") {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          name={field.key}
          rows={3}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={FIELD}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={field.key}
        type={field.kind === "number" ? "text" : field.kind}
        inputMode={field.kind === "tel" ? "tel" : field.kind === "number" ? "numeric" : undefined}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD}
      />
      {field.key === "dob" && typeof value === "string" && ageFromDob(value) && (
        <p className="text-mono-cap mt-1.5 text-(--muted) uppercase">Age {ageFromDob(value)}</p>
      )}
    </div>
  );
}

export function IntakeForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [errorNote, setErrorNote] = useState<string | null>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers, hydrated]);

  const set = useCallback((key: string, v: string | string[]) => {
    setAnswers((a) => ({ ...a, [key]: v }));
  }, []);

  const current = STEPS[step];
  const sections = useMemo(
    () => current.sections.map(sectionById).filter((s) => !s.when || s.when(answers)),
    [current, answers],
  );
  const missing = useMemo(
    () => sections.flatMap((s) => missingRequired(s, answers)),
    [sections, answers],
  );
  const missingKeys = new Set(missing.map((f) => f.key));

  const goTo = (n: number) => {
    setStep(n);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => {
    if (missing.length) {
      setShowErrors(true);
      document.getElementById(`f-${missing[0].key}`)?.focus();
      return;
    }
    if (step === 0) track(EV.FORM_OPEN, { form: "intake" });
    goTo(step + 1);
  };

  const submit = async () => {
    if (missing.length) {
      setShowErrors(true);
      return;
    }
    setStatus("building");
    setErrorNote(null);
    try {
      const { buildIntakePdf, toBase64 } = await import("./pdf");
      const bytes = await buildIntakePdf(answers);
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
      let delivered = false;
      if (RELAY && TOKEN) {
        setStatus("sending");
        try {
          const res = await fetch(RELAY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: TOKEN,
              patientName: String(answers.name ?? ""),
              pdfBase64: toBase64(bytes),
            }),
          });
          delivered = res.ok;
        } catch {
          delivered = false;
        }
      }
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setStatus(delivered ? "sent" : "fallback");
    } catch (err) {
      setStatus("idle");
      setErrorNote(err instanceof Error ? err.message : "Something went wrong building your form.");
    }
  };

  if (status === "sent" || status === "fallback") {
    const name = String(answers.name ?? "").split(" ")[0] || "there";
    return (
      <div className="rounded-[4px] border border-(--hairline) bg-(--card-bg) p-6 shadow-(--card-shadow) sm:p-8">
        <p role="status" className="text-mono-label flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-led-500" />
          {status === "sent" ? "Sent to the office" : "Your form is ready"}
        </p>
        <h2 className="text-h2s mt-4">
          {status === "sent" ? `Thank you, ${name}. We have it.` : `Thank you, ${name}.`}
        </h2>
        <p className="text-body mt-4 max-w-prose">
          {status === "sent"
            ? "Your intake went straight to our front desk. Keep a copy for yourself if you like, and we will see you at your appointment."
            : "We could not deliver it automatically, so please save the PDF below and bring it with you, or show it on your phone at the desk. We will take it from there."}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              download={`HCNG-intake-${String(answers.name ?? "patient").replace(/[^A-Za-z0-9]+/g, "-")}.pdf`}
              className="btn text-mono-label inline-flex min-h-12 items-center justify-center rounded-[4px] bg-teal-500 px-6 py-3 text-paper-50 transition-colors duration-150 hover:bg-teal-600"
            >
              Download your PDF
            </a>
          )}
          <a
            href={PHONE_TEL}
            onClick={() => track(EV.TEL_CLICK, { location: "intake" })}
            className="text-mono-label text-(--link) underline decoration-1 underline-offset-4"
          >
            Questions? Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ol className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => i < step && goTo(i)}
              disabled={i > step}
              className={cn(
                "flex items-center gap-2.5 text-left",
                i === step ? "text-current" : "text-(--muted)",
                i > step && "cursor-default",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              <SequenceCrescent n={i + 1} size={32} />
              <span className="text-mono-label">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <form
        className="mt-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) next();
          else void submit();
        }}
        noValidate
      >
        {/* Honeypot: a real visitor never sees this field. */}
        <input type="text" name="company" tabIndex={-1} aria-hidden="true" autoComplete="off" className="hidden" />

        {sections.map((section) => {
          const fields = visibleFields(section, answers);
          return (
            <section key={section.id} className="mb-12">
              <Eyebrow as="h2">{section.title}</Eyebrow>
              {section.intro && <p className="text-body mt-4 max-w-prose text-(--muted)">{section.intro}</p>}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div
                    key={f.key}
                    className={cn(
                      !f.half && "sm:col-span-2",
                      showErrors && missingKeys.has(f.key) && "rounded-[4px] outline outline-2 outline-offset-4 outline-(--brass)",
                    )}
                  >
                    <FieldInput field={f} value={answers[f.key]} onChange={(v) => set(f.key, v)} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {showErrors && missing.length > 0 && (
          <p role="alert" className="text-body mb-6 text-(--brass)">
            Please fill in: {missing.map((f) => f.label).join(", ")}.
          </p>
        )}
        {errorNote && (
          <p role="alert" className="text-body mb-6 text-(--brass)">
            {errorNote} Call <TelText location="body" /> and we will help.
          </p>
        )}

        <Rule />
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="btn text-mono-label inline-flex min-h-12 items-center justify-center rounded-[4px] border border-current/40 px-6 py-3 transition-colors duration-150 hover:border-current"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={status === "building" || status === "sending"}
            className="btn text-mono-label inline-flex min-h-12 items-center justify-center rounded-[4px] bg-teal-500 px-6 py-3 text-paper-50 transition-colors duration-150 hover:bg-teal-600 disabled:opacity-60"
          >
            {step < STEPS.length - 1
              ? "Continue"
              : status === "building"
                ? "Preparing your form"
                : status === "sending"
                  ? "Sending to the office"
                  : "Send to the office"}
          </button>
          <p className="text-mono-cap text-(--muted) uppercase">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
      </form>
    </div>
  );
}
