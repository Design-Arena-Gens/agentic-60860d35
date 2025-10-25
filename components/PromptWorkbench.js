import { useMemo } from "react";
import { motion } from "framer-motion";
import { getPaletteOptions } from "@/lib/promptEngine";

const toneOptions = [
  { value: "futuristic", label: "Futuristic" },
  { value: "vibrant", label: "Vibrant" },
  { value: "minimal", label: "Minimal" },
  { value: "elegant", label: "Elegant" },
  { value: "playful", label: "Playful" }
];

const layoutOptions = [
  { value: "product narrative", label: "Product Narrative" },
  { value: "split hero", label: "Split Hero" },
  { value: "modular grid", label: "Modular Grid" },
  { value: "dashboard", label: "Dashboard" },
  { value: "portfolio", label: "Portfolio Showcase" }
];

export default function PromptWorkbench({
  controls,
  onControlsChange,
  onGenerate,
  latestPrompt
}) {
  const paletteOptions = useMemo(() => getPaletteOptions(), []);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">Prompt Workbench</h2>
          <p className="max-w-2xl text-slate-400">
            Fine-tune the generator or craft a custom brief. Adjust tone, layouts, palettes, and motion intensity&mdash;the system remixes suggestions instantly.
          </p>
        </div>
        <button
          onClick={onGenerate}
          className="rounded-full bg-ember px-6 py-3 font-medium text-slate-950 transition hover:bg-ember/90"
        >
          Remix Prompt
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          className="glass rounded-3xl border border-slate-800/70 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <fieldset className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-wide text-slate-400">
                Tone
              </label>
              <select
                value={controls.tone}
                onChange={(event) => onControlsChange({ tone: event.target.value })}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-aurora focus:outline-none"
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="flex flex-col gap-2">
              <label className="text-sm uppercase tracking-wide text-slate-400">
                Layout composition
              </label>
              <select
                value={controls.layout}
                onChange={(event) => onControlsChange({ layout: event.target.value })}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-aurora focus:outline-none"
              >
                {layoutOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="flex flex-col gap-3 md:col-span-2">
              <label className="text-sm uppercase tracking-wide text-slate-400">
                Motion intensity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={controls.intensity}
                onChange={(event) => onControlsChange({ intensity: Number(event.target.value) })}
                className="accent-aurora"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Chill</span>
                <span>Balanced</span>
                <span>High Energy</span>
              </div>
            </fieldset>
            <fieldset className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-wide text-slate-400">
                Include palette suggestion
              </label>
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={controls.includePalette}
                  onChange={(event) => onControlsChange({ includePalette: event.target.checked })}
                  className="h-4 w-4 accent-aurora"
                />
                Show palette in prompt
              </label>
              {controls.includePalette && (
                <div className="flex gap-3">
                  {paletteOptions.map((palette) => (
                    <div key={palette.name} className="flex flex-col gap-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3">
                      <span className="text-xs uppercase tracking-wide text-slate-500">{palette.name}</span>
                      <div className="flex gap-2">
                        {palette.colors.map((color) => (
                          <span
                            key={color}
                            className="h-8 w-8 rounded-md border border-slate-800"
                            style={{ background: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400">{palette.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-3">
              <label className="text-sm uppercase tracking-wide text-slate-400">
                Feature callouts
              </label>
              <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={controls.includeCallouts}
                  onChange={(event) => onControlsChange({ includeCallouts: event.target.checked })}
                  className="h-4 w-4 accent-aurora"
                />
                Include hero callout suggestions
              </label>
            </fieldset>
            <fieldset className="md:col-span-2">
              <label className="text-sm uppercase tracking-wide text-slate-400">
                Export prompt
              </label>
              <textarea
                readOnly
                value={latestPrompt?.text ?? "Generate a prompt to preview the creative brief."}
                className="h-40 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 focus:outline-none"
              />
            </fieldset>
          </form>
        </motion.div>
        <motion.div
          className="glass flex flex-col gap-4 rounded-3xl border border-slate-800/70 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-medium text-slate-50">Prompt Modes</h3>
          <div className="space-y-4 divide-y divide-slate-800/80">
            <ModeCard
              title="Auto Pilot"
              description="Fully automated prompt assembly tuned for rapid ideation. Perfect for sprint kickoffs."
              active
            />
            <ModeCard
              title="Hybrid Remix"
              description="Start with a system prompt then inject your own product cues. Tuned for designers iterating fast."
            />
            <ModeCard
              title="Manual Blueprint"
              description="Lock in the structure yourself. Export a tidy brief aligned with brand guidelines."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ModeCard({ title, description, active = false }) {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">{title}</span>
        {active ? (
          <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            Active
          </span>
        ) : (
          <span className="text-xs text-slate-500">Coming soon</span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}
