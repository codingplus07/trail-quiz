import { useState } from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaReact,
  FaTrophy,
  FaUsers,
  FaLayerGroup,
  FaClock,
  FaUserPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Home({
  studentName = "",
  totalQuestions = 0,
  sectionCount = 0,
  onContinue,
  onNewStudent,
  users = [],
  onLogin,
}) {
  const [name, setName] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      alert("कृपया अपना नाम दर्ज करें।");
      return;
    }

    onContinue(cleanName);
    setName("");
  };

  const handleExistingUser = (user) => {
    if (onLogin) {
      onLogin(user.id);
    }

    setShowUsers(false);
  };

  return (
    <main className="relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#050816]">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/10 blur-[110px]" />

        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>


      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

        {/* =====================================
            HERO
        ===================================== */}

        <section className="mx-auto max-w-4xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 sm:text-xs">
              Smart Indian Exam Preparation
            </span>
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            पढ़ो भी,
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Practice भी।
            </span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-sm font-semibold leading-7 text-slate-400 sm:text-base sm:leading-8"
          >
            भारतीय संविधान, इतिहास, भूगोल और
            General Knowledge को Hindi में
            interactive quizzes के साथ prepare
            करें।
          </motion.p>

        </section>


        {/* =====================================
            STATS
        ===================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4"
        >

          <StatCard
            icon={<FaBookOpen />}
            value={totalQuestions}
            label="Questions"
          />

          <StatCard
            icon={<FaLayerGroup />}
            value={sectionCount}
            label="Sections"
          />

          <StatCard
            icon={<FaCheckCircle />}
            value="30"
            label="Per Attempt"
          />

          <StatCard
            icon={<FaClock />}
            value="30 Min"
            label="Timer"
          />

        </motion.section>


        {/* =====================================
            START CARD
        ===================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 max-w-xl"
        >

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">

            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FaUsers size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-white">
                    {studentName
                      ? `Welcome, ${studentName}`
                      : "अपना Test शुरू करें"}
                  </h2>

                  <p className="text-xs font-semibold text-slate-500">
                    अपना नाम दर्ज करके शुरू करें
                  </p>
                </div>

              </div>


              {/* =================================
                  NEW STUDENT
              ================================= */}

              <form onSubmit={handleSubmit}>

                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                  Student Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="अपना नाम लिखें..."
                  maxLength={40}
                  autoComplete="name"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#080d1d] px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-[#0a1022] focus:ring-4 focus:ring-indigo-500/10"
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!name.trim()}
                  className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-black text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span>Start Test</span>

                  <FaArrowRight size={14} />
                </motion.button>

              </form>


              {/* =================================
                  EXISTING STUDENT
              ================================= */}

              {users.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setShowUsers(!showUsers)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-black text-slate-500 transition hover:text-indigo-400"
                >
                  <FaUsers size={13} />

                  Continue as existing student
                </button>
              )}


              {showUsers && users.length > 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  className="mt-2 space-y-2 overflow-hidden"
                >
                  {users.slice(0, 5).map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() =>
                        handleExistingUser(user)
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left transition hover:border-indigo-500/30 hover:bg-indigo-500/10"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-black text-indigo-400">
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>
                          <p className="text-xs font-black text-white">
                            {user.name}
                          </p>

                          <p className="text-[9px] font-bold text-slate-600">
                            {user.completedSections?.length || 0}{" "}
                            sections completed
                          </p>
                        </div>

                      </div>

                      <FaArrowRight
                        size={11}
                        className="text-slate-600"
                      />

                    </button>
                  ))}
                </motion.div>
              )}


              {/* =================================
                  NEW STUDENT BUTTON
              ================================= */}

              {studentName && (
                <button
                  type="button"
                  onClick={onNewStudent}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] py-3 text-xs font-black text-slate-500 transition hover:border-indigo-500/20 hover:bg-indigo-500/5 hover:text-white"
                >
                  <FaUserPlus size={13} />

                  Start as New Student
                </button>
              )}

            </div>

          </div>

        </motion.section>


        {/* =====================================
            FEATURES
        ===================================== */}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3"
        >

          <Feature
            icon={<FaCheckCircle />}
            title="Unique Questions"
            text="एक बार किया हुआ question दोबारा नहीं आएगा।"
          />

          <Feature
            icon={<FaTrophy />}
            title="Progress Tracking"
            text="हर student का progress अलग save होगा।"
          />

          <Feature
            icon={<FaReact />}
            title="Hindi Friendly"
            text="Indian exams के लिए आसान Hindi interface।"
          />

        </motion.section>


        {/* =====================================
            FOOT NOTE
        ===================================== */}

        <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
          Practice • Improve • Repeat • Succeed
        </p>

      </div>

    </main>
  );
}


/* =========================================
   STAT CARD
========================================= */

function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-xl"
    >
      <div className="mb-2 flex justify-center text-indigo-400">
        {icon}
      </div>

      <p className="text-xl font-black text-white sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-600">
        {label}
      </p>
    </motion.div>
  );
}


/* =========================================
   FEATURE CARD
========================================= */

function Feature({
  icon,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
        {icon}
      </div>

      <h3 className="text-sm font-black text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
        {text}
      </p>
    </motion.div>
  );
}

export default Home;