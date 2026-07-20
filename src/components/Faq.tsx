"use client";

/**
 * FAQ: native details/summary with a 200ms grid ease (CSS in globals). Always
 * on a light band, never dark. After the third item, the licensed inline
 * phone prompt: "Faster to just ask? 810.584.7170". No wink copy inside.
 */

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { CrescentMark } from "./BrassDial";
import { TelText } from "./Button";

export type FaqItem = { q: string; a: React.ReactNode };

export function Faq({
  items,
  phonePromptAfter = 3,
  className,
}: {
  items: FaqItem[];
  /** 1-based index after which the phone prompt renders; 0 disables. */
  phonePromptAfter?: number;
  className?: string;
}) {
  return (
    <div className={cn("measure", className)}>
      {items.map((item, i) => (
        <Fragment key={item.q}>
          <details className="faq-item border-b border-(--hairline)">
            <summary className="flex items-center justify-between gap-4 py-5">
              <span className="font-serif text-[18px] leading-snug font-semibold">
                {item.q}
              </span>
              <span className="faq-marker shrink-0 text-(--brass)">
                <CrescentMark size={16} />
              </span>
            </summary>
            <div className="text-body grid gap-4 pb-6 text-(--muted)">
              {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
            </div>
          </details>
          {phonePromptAfter > 0 && i + 1 === phonePromptAfter && (
            <p className="text-mono-label border-b border-(--hairline) py-5">
              Faster to just ask? <TelText location="body" />
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
}
