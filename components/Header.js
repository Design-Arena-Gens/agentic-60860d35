import { motion } from "framer-motion";

export default function Header({ onGenerate, latestPrompt }) {
  return (
    <header className="relative overflow-hidden py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-40 top-10 h-64 w-64 rounded-full bg-aurora/30 blur-3xl mix-blend-screen" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blush/20 blur-3xl mix-blend-screen" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 lg:flex-row lg:items-center">
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900 px-4 py-1 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live prompt engine
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-50 md:text-5xl lg:text-6xl">
            Curate bold web identities with intelligent prompt orchestration.
          </h1>
          <p className="text-lg text-slate-300 md:text-xl">
            Blend AI-powered prompt generation with handpicked design showcases to spark your next launch. Switch modes, capture inspiration, and export concepts in seconds.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGenerate}
              className="rounded-full bg-aurora px-6 py-3 font-medium text-slate-950 transition hover:bg-aurora/90"
            >
              Generate fresh prompt
            </button>
            {latestPrompt && (
              <motion.span
                className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {latestPrompt.tone.charAt(0).toUpperCase() + latestPrompt.tone.slice(1)} tone · {latestPrompt.layout}
              </motion.span>
            )}
          </div>
        </motion.div>
        <motion.div
          className="glass relative flex w-full max-w-lg flex-col gap-4 overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/40 p-8 shadow-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
            <span>Prompt feed</span>
            <span>Auto curated</span>
          </div>
          <div className="space-y-4">
            {latestPrompt ? (
              <>
                <p className="text-sm text-slate-300">{latestPrompt.text}</p>
                {latestPrompt.palette && (
                  <div className="flex items-center gap-3">
                    {latestPrompt.palette.colors.map((color) => (
                      <span
                        key={color}
                        className="h-10 w-10 rounded-lg border border-slate-700"
                        style={{ background: color }}
                        title={color}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3 text-sm text-slate-400">
                <p>Tap into the generator to reveal an adaptive prompt tailored for modern web experiences.</p>
                <p>Each prompt comes with tone guidance, layout direction, and interactive callouts ready for design exploration.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
