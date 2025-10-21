import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow md:p-6"
    >
      <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-slate-100 p-2">{icon}</div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </motion.div>
  );
}
