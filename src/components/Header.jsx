
import {
  FaArrowLeft,
  FaHome,
  FaReact,
  FaUserPlus,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Header({
  studentName = "",
  page = "/",
  onBack,
  onHome,
  onNewStudent,
}) {
  const showBack =
    page !== "/" &&
    page !== "/home";

  return (
    <>

      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-3 sm:h-[72px] sm:px-6 lg:px-8">

        {/* ==========================
            BRAND
        =========================== */}

        <button
          type="button"
          onClick={onHome}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >

          <motion.div
            whileHover={{
              rotate: 180,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 sm:h-11 sm:w-11 sm:rounded-2xl"
          >

            <FaReact
              size={22}
              className="text-cyan-400"
            />

          </motion.div>


          <div className="min-w-0 text-left">

            <h1 className="text-[16px] font-black leading-none tracking-tight text-white sm:text-lg">
              Bharat
              <span className="text-indigo-400">
                Prep
              </span>
            </h1>

            <p className="mt-1 text-[6px] font-black uppercase tracking-[0.18em] text-slate-600 sm:text-[8px]">
              Smart Exam Preparation
            </p>

          </div>

        </button>


        {/* ==========================
            RIGHT
        =========================== */}

        <div className="flex items-center gap-2">

          {studentName && (
            <div className="text-right">

              <p className="text-[7px] font-black uppercase tracking-widest text-slate-600 sm:text-[9px]">
                Student
              </p>

              <p className="max-w-[90px] truncate text-[10px] font-black text-slate-300 sm:max-w-[130px] sm:text-xs">
                {studentName}
              </p>

            </div>
          )}


          {showBack && (
            <motion.button
              type="button"
              onClick={onHome}
              whileTap={{
                scale: 0.95,
              }}
              className="flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-[11px] font-black text-slate-400 transition hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
            >

              <FaHome size={12} />

              <span className="hidden sm:inline">
                Home
              </span>

            </motion.button>
          )}

        </div>

      </div>


      {/* ==========================
          FLOATING BACK BUTTON
      =========================== */}

      {showBack && (
        <motion.button
          type="button"
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          whileHover={{
            x: 3,
          }}
          whileTap={{
            scale: 0.94,
          }}
          onClick={onBack}
          aria-label="Go back"
          className="group fixed left-3 top-[82px] z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0b1020]/95 text-slate-400 shadow-xl backdrop-blur-xl transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white sm:left-5 sm:top-[88px] sm:h-11 sm:w-auto sm:gap-2 sm:px-3 sm:rounded-2xl"
        >

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 group-hover:bg-indigo-500/20">

            <FaArrowLeft
              size={12}
            />

          </div>

          <span className="hidden text-xs font-black sm:block">
            Back
          </span>

        </motion.button>
      )}

    </>
  );
}

export default Header;

