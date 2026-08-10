import {
  CheckCircle2,
  CircleX,
  MinusCircle,
  Trophy,
} from "lucide-react";

import { motion } from "framer-motion";

function ScoreCard({
  result,
}) {
  return (
    <div>

      <motion.div
        initial={{
          scale: 0.6,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-[8px] border-indigo-500/20 bg-indigo-500/5"
      >

        <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-indigo-500/10">

          <Trophy
            size={20}
            className="mb-1 text-yellow-400"
          />

          <span className="text-4xl font-black text-white">
            {result.percentage}%
          </span>

          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">
            Score
          </span>

        </div>

      </motion.div>

      <div className="mt-8 grid grid-cols-3 gap-3">

        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-center">

          <CheckCircle2
            size={20}
            className="mx-auto text-emerald-400"
          />

          <p className="mt-2 text-xl font-black text-white">
            {result.correct}
          </p>

          <p className="text-[9px] font-black uppercase text-slate-500">
            Correct
          </p>

        </div>

        <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4 text-center">

          <CircleX
            size={20}
            className="mx-auto text-red-400"
          />

          <p className="mt-2 text-xl font-black text-white">
            {result.wrong}
          </p>

          <p className="text-[9px] font-black uppercase text-slate-500">
            Wrong
          </p>

        </div>

        <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-4 text-center">

          <MinusCircle
            size={20}
            className="mx-auto text-yellow-400"
          />

          <p className="mt-2 text-xl font-black text-white">
            {result.unattempted}
          </p>

          <p className="text-[9px] font-black uppercase text-slate-500">
            Skipped
          </p>

        </div>

      </div>

    </div>
  );
}

export default ScoreCard;