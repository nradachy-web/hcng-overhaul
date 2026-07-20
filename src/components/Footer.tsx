"use client";

/**
 * Global footer (DESIGN_DIRECTION 6): espresso-950, Poiret One wordmark,
 * verbatim NAP, hours table, page index, socials including TikTok, legal
 * links, crescent C mark. Fax renders on /hipaa/ only, not here.
 */

import Link from "next/link";
import { track } from "@/lib/track";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  EMAIL_MAILTO,
  EV,
  HOURS_TABLE,
  MAPS_DIRECTIONS_URL,
  NAV_FOOTER,
  NAV_LEGAL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIALS,
} from "@/lib/constants";
import { CrescentMark } from "./BrassDial";
import { Rule } from "./Band";

const colHead = "text-mono-label mb-4 text-paper-50/60";
const link =
  "transition-colors duration-150 hover:text-paper-50 focus-visible:text-paper-50";

export function Footer() {
  return (
    <footer id="site-footer" className="band band-espresso-deep">
      <div className="container-site pt-16 pb-10 lg:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="font-display text-[32px] leading-none tracking-[0.05em] uppercase">
            Hanczaryk
          </p>
          <p className="text-mono-cap text-paper-50/60">
            CHIROPRACTIC NEUROLOGY GROUP
          </p>
        </div>

        <Rule className="mt-8 mb-12" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className={colHead}>Contact</h2>
            <address className="text-body grid gap-3 not-italic">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
                onClick={() => track(EV.DIRECTIONS_CLICK)}
              >
                {ADDRESS_LINE_1}
                <br />
                {ADDRESS_LINE_2}
              </a>
              <a
                href={PHONE_TEL}
                className={link}
                onClick={() => track(EV.TEL_CLICK, { location: "footer" })}
              >
                {PHONE_DISPLAY}
              </a>
              <a href={EMAIL_MAILTO} className={link}>
                {EMAIL}
              </a>
            </address>
          </div>

          <div>
            <h2 className={colHead}>Office Hours</h2>
            <table className="text-mono-cap w-full max-w-64">
              <tbody>
                {HOURS_TABLE.map((row) => (
                  <tr key={row.day} className="border-b border-(--hairline)">
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                      {row.day}
                    </th>
                    <td className="py-1.5 text-right text-paper-50/75">
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className={colHead}>Pages</h2>
            <ul className="text-mono-cap grid gap-2">
              {NAV_FOOTER.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${link} text-paper-50/75`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={colHead}>Follow</h2>
            <ul className="text-mono-label grid gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link} text-paper-50/75`}
                    onClick={() => {
                      if ("tiktok" in s && s.tiktok) track(EV.TIKTOK_OUT);
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-body mt-5 max-w-56 text-paper-50/60 italic">
              Every Friday, a fun fact. Follow along.
            </p>
          </div>
        </div>

        <Rule className="mt-14 mb-6" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-brass-300">
            <CrescentMark size={22} />
          </span>
          <ul className="text-mono-cap flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`${link} text-paper-50/60`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
