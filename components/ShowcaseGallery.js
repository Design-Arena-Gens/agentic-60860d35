import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { showcases } from "@/lib/showcases";

const filterTags = [
  "all",
  "futuristic",
  "dashboard",
  "portfolio",
  "playful",
  "gradient",
  "climate",
  "ecommerce"
];

export default function ShowcaseGallery() {
  const [activeTag, setActiveTag] = useState("all");

  const filtered = useMemo(() => {
    if (activeTag === "all") {
      return showcases;
    }
    return showcases.filter((item) => item.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">Design Showcases</h2>
          <p className="max-w-2xl text-slate-400">
            Explore curated visual systems aligned with generated prompts. Each tile hints at layout structure, motion behavior, and palette rhythm.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeTag === tag
                  ? "border-aurora bg-aurora/20 text-aurora"
                  : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Card({ item }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/60"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.6 }}
        >
          <CanvasMock palette={item.palette} />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 pb-4">
          <span className="rounded-full bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            {item.hero.alignment}
          </span>
          <span className="rounded-full bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            {item.hero.cta}
          </span>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CanvasMock({ palette }) {
  return (
    <div className="flex h-full flex-col gap-3 p-6">
      <div className="flex gap-3">
        <div className="h-16 flex-1 rounded-2xl bg-slate-800/80" />
        <div className="flex w-16 flex-col gap-2">
          {palette.map((color) => (
            <span
              key={color}
              className="h-5 w-full rounded-lg"
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-800/70" />
        <div className="flex flex-col gap-3">
          <div className="h-3 rounded-full bg-slate-700/80" />
          <div className="h-3 rounded-full bg-slate-700/70" />
          <div className="h-3 w-2/3 rounded-full bg-slate-700/60" />
          <div className="mt-auto h-10 rounded-xl bg-slate-800/80" />
        </div>
      </div>
    </div>
  );
}
