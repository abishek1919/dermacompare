"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TipCarousel({ tips }: { tips: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % tips.length), 3500);
    return () => clearInterval(id);
  }, [tips.length]);

  return (
    <div className="relative h-28 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <AnimatePresence mode="wait">
        <motion.p
          key={tips[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="text-sm leading-6 text-muted"
        >
          {tips[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
