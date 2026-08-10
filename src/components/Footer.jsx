import {
  FaReact,
  FaGithub,
  FaLinkedin,
  FaCode,
} from "react-icons/fa";

import {
  FiMail,
  FiHeart,
  FiArrowUpRight,
} from "react-icons/fi";

import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#02040a]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <motion.div
                whileHover={{
                  rotate: 360,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
              >
                <FaReact
                  size={28}
                  className="text-cyan-400"
                />
              </motion.div>

              <div>
                <h2 className="text-xl font-black text-white">
                  Bharat
                  <span className="text-indigo-400">
                    Prep
                  </span>
                  <span className="text-emerald-400 ml-2 text-sm">Trail Mode</span>
                </h2>

                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-600">
                  Smart Exam Preparation
                </p>
              </div>

            </div>

            <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-slate-500">
              Hindi medium students के लिए बनाया गया
              modern competitive exam preparation
              platform.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-500">

              <FaCode className="text-indigo-400" />

              Built with React.js

            </div>

          </div>


          {/* Developer */}
          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              Designed & Developed By
            </p>

            <h3 className="mt-3 text-2xl font-black text-white">
              Aditya Kumar
            </h3>

            <p className="mt-1 text-xs font-bold text-slate-500">
              MERN Stack Developer
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-[10px] font-bold text-cyan-400">
                React.js
              </span>

              <span className="rounded-lg border border-indigo-400/10 bg-indigo-400/5 px-3 py-1.5 text-[10px] font-bold text-indigo-400">
                Node.js
              </span>

              <span className="rounded-lg border border-purple-400/10 bg-purple-400/5 px-3 py-1.5 text-[10px] font-bold text-purple-400">
                MongoDB
              </span>

              <span className="rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-3 py-1.5 text-[10px] font-bold text-emerald-400">
                Tailwind CSS
              </span>

            </div>

          </div>


          {/* Social */}
          <div>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
              Connect With Developer
            </p>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
              "एक ही तो zindagi है यारों, कुछ Bada करो।"

            </p>

            <div className="mt-5 flex gap-3">

              {/* GitHub */}
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -5,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={20} />

                <FiArrowUpRight
                  size={10}
                  className="absolute mt-[-28px] ml-[28px] opacity-0 transition group-hover:opacity-100"
                />
              </motion.a>


              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -5,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </motion.a>


              {/* Email */}
              <motion.a
                href="mailto:your-email@example.com"
                whileHover={{
                  y: -5,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-400"
                aria-label="Email"
              >
                <FiMail size={20} />
              </motion.a>

            </div>

          </div>

        </div>


        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />


        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <p className="text-xs font-bold text-slate-600">
            © {new Date().getFullYear()} BharatPrep.
            All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs font-bold text-slate-600">

            Made with

            <FiHeart
              size={13}
              className="text-red-500"
            />

            for Indian Aspirants

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;