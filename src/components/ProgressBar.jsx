import { motion } from "framer-motion";

function ProgressBar({
  current,
  total,
}) {
  const percentage =
    (current / total) * 100;

  return (
    <div className="w-full">

      <div className="mb-2 flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-500">

        <span>
          Progress
        </span>

        <span>
          {current}/{total}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${percentage}%`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
        />

      </div>

    </div>
  );
}

export default ProgressBar;