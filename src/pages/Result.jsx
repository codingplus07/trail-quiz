
import {
  Home,
  RotateCcw,
  Trophy,
  Layers,
} from "lucide-react";

import { motion } from "framer-motion";

import ScoreCard from "../components/ScoreCard";

function Result({
  result,
  studentName,
  onRestart,
  onSections,
  onHome,
}) {
  if (!result) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="glass-card glow rounded-[30px] p-6 text-center sm:p-10"
      >

        {/* TROPHY */}

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">

          <Trophy size={25} />

        </div>


        {/* TITLE */}

        <p className="mt-5 text-xs font-black uppercase tracking-widest text-indigo-400">
          Attempt Completed
        </p>


        <h1 className="mt-2 text-3xl font-black text-white">
          बहुत बढ़िया, {studentName}!
        </h1>


        <p className="mt-3 text-sm font-medium text-slate-500">
          Section {result.sectionId} का आपका performance
        </p>


        {/* SCORE */}

        <div className="mt-8">

          <ScoreCard
            result={result}
          />

        </div>


        {/* STATUS */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

          <p className="text-xs font-bold text-slate-400">

            {result.autoSubmitted
              ? "⏰ समय समाप्त होने पर test automatically submit हुआ।"
              : "🎉 आपने यह section successfully complete किया।"}

          </p>

        </div>


        {/* BUTTONS */}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">

          {/* RESTART */}

          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 text-xs font-black text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
          >

            <RotateCcw size={16} />

            Restart Quiz

          </button>


          {/* SECTIONS */}

          <button
            onClick={onSections}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xs font-black text-slate-300 transition hover:bg-white/10"
          >

            <Layers size={16} />

            Sections

          </button>


          {/* HOME */}

          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xs font-black text-slate-300 transition hover:bg-white/10"
          >

            <Home size={16} />

            Home

          </button>

        </div>

      </motion.div>

    </main>
  );
}

export default Result;

