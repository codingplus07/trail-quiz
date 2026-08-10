
import {
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

function SectionCard({
  section,
  completed,
  locked,
  onClick,
}) {
  const start =
    (section.id - 1) * 30 + 1;

  const end =
    start +
    section.questionCount -
    1;

  return (
    <motion.button
      disabled={locked}
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={
        !locked
          ? {
              y: -5,
            }
          : {}
      }
      whileTap={
        !locked
          ? {
              scale: 0.98,
            }
          : {}
      }
      className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition ${
        locked
          ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50"
          : completed
          ? "border-emerald-500/20 bg-emerald-500/[0.05] hover:border-indigo-500/40"
          : "border-white/10 bg-white/[0.035] hover:border-indigo-500/40"
      }`}
    >

      {/* TOP CONTENT */}

      <div className="relative flex items-center justify-between">

        <div className="flex items-center gap-4">

          {/* SECTION ICON */}

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-black ${
              completed
                ? "bg-emerald-500/10 text-emerald-400"
                : locked
                ? "bg-white/5 text-slate-600"
                : "bg-indigo-500/10 text-indigo-400"
            }`}
          >
            {completed ? (
              <CheckCircle2 size={22} />
            ) : locked ? (
              <Lock size={19} />
            ) : (
              section.id
            )}
          </div>

          {/* SECTION INFO */}

          <div>
            <div className="flex items-center gap-2">

              <p className="font-black text-white">
                Section {section.id}
              </p>

              {!locked &&
                !completed && (
                  <Sparkles
                    size={13}
                    className="text-indigo-400"
                  />
                )}

            </div>

            <p className="mt-1 text-[11px] font-bold text-slate-500">
              Questions {start} – {end}
            </p>
          </div>

        </div>

        {/* RIGHT ICON */}

        {!locked && (
          completed ? (
            <RotateCcw
              size={19}
              className="text-indigo-400"
            />
          ) : (
            <Play
              size={19}
              className="text-indigo-400"
            />
          )
        )}

      </div>

      {/* BOTTOM CONTENT */}

      <div className="mt-5 flex justify-between">

        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
          {section.questionCount} Questions
        </span>

        <span
          className={`text-[10px] font-black uppercase tracking-wider ${
            completed
              ? "text-indigo-400"
              : locked
              ? "text-slate-600"
              : "text-indigo-400"
          }`}
        >
          {completed
            ? "Restart Quiz"
            : locked
            ? "Locked"
            : "Start Now"}
        </span>

      </div>

    </motion.button>
  );
}

export default SectionCard;

