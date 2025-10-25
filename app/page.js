"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import PromptWorkbench from "@/components/PromptWorkbench";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import WorkflowStrip from "@/components/WorkflowStrip";
import { generatePrompt } from "@/lib/promptEngine";

export default function HomePage() {
  const [controls, setControls] = useState({
    tone: "futuristic",
    layout: "product narrative",
    intensity: 0.7,
    includePalette: true,
    includeCallouts: true
  });
  const [latestPrompt, setLatestPrompt] = useState(null);

  const runGenerator = useCallback(() => {
    setLatestPrompt(generatePrompt(controls));
  }, [controls]);

  useEffect(() => {
    setLatestPrompt(generatePrompt(controls));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleControlsChange = (updates) => {
    setControls((prev) => {
      const next = { ...prev, ...updates };
      setLatestPrompt(generatePrompt(next));
      return next;
    });
  };

  return (
    <main className="space-y-10">
      <Header
        onGenerate={runGenerator}
        latestPrompt={latestPrompt}
      />
      <PromptWorkbench
        controls={controls}
        latestPrompt={latestPrompt}
        onControlsChange={handleControlsChange}
        onGenerate={runGenerator}
      />
      <WorkflowStrip />
      <ShowcaseGallery />
      <footer className="border-t border-slate-800/70 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>AI Prompt Design Gallery · Crafted for rapid inspiration</span>
          <div className="flex gap-4">
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:text-slate-300">
              Deployed on Vercel
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-slate-300">
              Powered by Next.js
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
