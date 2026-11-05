"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** One restrained scroll reveal: a short fade with 12px of travel. Disabled for reduced motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
