import { motion } from "framer-motion";

const steps = [
  {
    title: "Select Intent",
    description: "Align tone, layout, and motion intensity with your product story.",
    accent: "bg-aurora/40"
  },
  {
    title: "Generate Prompt",
    description: "Tap into the engine to craft a vivid creative brief with palette cues.",
    accent: "bg-ember/40"
  },
  {
    title: "Explore Showcases",
    description: "Review curated design systems that pair with the generated direction.",
    accent: "bg-blush/40"
  }
];

export default function WorkflowStrip() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.1),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-semibold text-slate-50 md:text-3xl">
          Flow through ideation with clarity.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`glass rounded-3xl border border-slate-800/70 p-6 ${step.accent}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-sm uppercase tracking-wide text-slate-300">
                Step {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-50">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
