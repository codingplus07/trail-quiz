import {
  Bookmark,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  isMarked,
  onToggleMark,
}) {
  return (
    <motion.div
      key={question.id}
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="glass-card overflow-hidden rounded-[28px]"
    >

      <div className="border-b border-white/10 p-5 sm:p-7">

        <div className="mb-5 flex items-center justify-between">

          <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-400">
            Question
          </span>

          <button
            onClick={onToggleMark}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[10px] font-black transition ${
              isMarked
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-white/5 text-slate-500 hover:text-white"
            }`}
          >

            <Bookmark
              size={14}
              fill={
                isMarked
                  ? "currentColor"
                  : "none"
              }
            />

            {isMarked
              ? "Marked"
              : "Review"}
          </button>

        </div>

        <h2 className="text-lg font-black leading-8 text-white sm:text-xl">

          {question.question}

        </h2>

      </div>

      <div className="space-y-3 p-5 sm:p-7">

        {question.options.map(
          (option, index) => {
            const selected =
              selectedAnswer === index;

            return (
              <motion.button
                key={index}
                whileTap={{
                  scale: 0.985,
                }}
                onClick={() =>
                  onAnswer(index)
                }
                className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                  selected
                    ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-900/20"
                    : "border-white/10 bg-white/[0.025] hover:border-indigo-500/40 hover:bg-indigo-500/[0.05]"
                }`}
              >

                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                    selected
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                      : "bg-white/5 text-slate-400 group-hover:text-indigo-400"
                  }`}
                >
                  {String.fromCharCode(
                    65 + index
                  )}
                </span>

                <span
                  className={`text-sm font-bold leading-6 ${
                    selected
                      ? "text-white"
                      : "text-slate-300"
                  }`}
                >
                  {option}
                </span>

                {selected && (
                  <CheckCircle2
                    size={19}
                    className="ml-auto shrink-0 text-indigo-400"
                  />
                )}

              </motion.button>
            );
          }
        )}

      </div>

    </motion.div>
  );
}

export default QuestionCard;