"use client";

/**
 * Rise: the sitewide entrance verb. opacity 0 to 1 plus translateY 12px to 0,
 * 320ms, ease-settle, whileInView once, viewport margin -80px, sibling
 * stagger 70ms via RevealGroup. Reduced motion: a 160ms opacity fade.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { FADE_TRANSITION, RISE_TRANSITION, VIEWPORT_ONCE } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "li" | "p" | "span" | "header" | "blockquote";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={
        reduced ? FADE_TRANSITION : { ...RISE_TRANSITION, delay }
      }
      className={className}
    >
      {children}
    </Comp>
  );
}

const groupVariants = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduced ? 0 : 0.07 },
  },
});

const itemVariants = (reduced: boolean): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
  show: reduced
    ? { opacity: 1, transition: FADE_TRANSITION }
    : { opacity: 1, y: 0, transition: RISE_TRANSITION },
});

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={groupVariants(!!reduced)}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "figure" | "article";
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp variants={itemVariants(!!reduced)} className={cn(className)}>
      {children}
    </Comp>
  );
}
