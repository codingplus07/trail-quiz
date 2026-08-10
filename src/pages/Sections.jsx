
import {
  Trophy,
  Layers,
} from "lucide-react";

import {
  useMemo,
} from "react";

import SectionCard from "../components/SectionCard";

import {
  getSectionCount,
  getSectionQuestions,
  getCompletedSections,
} from "../utils/quizUtils";

function Sections({
  questions,
  onSelectSection,
  onRestartSection,
}) {

  /* =====================================
     DYNAMIC SECTION COUNT
  ===================================== */

  const sectionCount =
    getSectionCount(
      questions
    );


  /* =====================================
     COMPLETED SECTIONS
  ===================================== */

  const completed =
    getCompletedSections();


  /* =====================================
     GENERATE SECTIONS
  ===================================== */

  const sections = useMemo(() => {

    return Array.from(
      {
        length: sectionCount,
      },
      (_, index) => {

        const sectionId =
          index + 1;

        const sectionQuestions =
          getSectionQuestions(
            questions,
            sectionId
          );

        return {
          id: sectionId,

          questionCount:
            sectionQuestions.length,
        };
      }
    );

  }, [
    questions,
    sectionCount,
  ]);


  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">

            <Layers
              size={23}
              className="text-indigo-400"
            />

          </div>

          <div>

            <p className="text-xs font-black uppercase tracking-widest text-indigo-400">
              Learning Journey
            </p>

            <h1 className="text-2xl font-black text-white sm:text-3xl">
              अपनी तैयारी जारी रखें
            </h1>

          </div>

        </div>

        <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-500">
          हर section में maximum 30
          questions हैं। सभी sections
          automatically आपके question
          bank के हिसाब से generate होते
          हैं।
        </p>

      </div>


      {/* PROGRESS */}

      <div className="glass-card mb-8 rounded-2xl p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Overall Progress
            </p>

            <p className="mt-1 text-2xl font-black text-white">
              {completed.length} /{" "}
              {sections.length}
            </p>

          </div>

          <Trophy
            size={23}
            className="text-yellow-400"
          />

        </div>


        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">

          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
            style={{
              width: `${
                sections.length
                  ? (completed.length /
                      sections.length) *
                    100
                  : 0
              }%`,
            }}
          />

        </div>


        <div className="mt-3 flex justify-between text-[10px] font-bold text-slate-600">

          <span>
            {questions.length} Questions
          </span>

          <span>
            {sections.length} Sections
          </span>

        </div>

      </div>


      {/* SECTION GRID */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {sections.map(
          (section) => {

            const isCompleted =
              completed.includes(
                section.id
              );


            /*
              First section unlocked.

              Other sections unlock
              after previous section.

              Completed section can
              always be restarted.
            */

            const previousCompleted =
              section.id === 1 ||
              completed.includes(
                section.id - 1
              );


            return (
              <SectionCard

                key={
                  section.id
                }

                section={
                  section
                }

                completed={
                  isCompleted
                }

                locked={
                  !previousCompleted &&
                  !isCompleted
                }

                onClick={() => {

                  if (
                    isCompleted
                  ) {

                    onRestartSection(
                      section.id
                    );

                  } else {

                    onSelectSection(
                      section.id
                    );

                  }

                }}

              />
            );
          }
        )}

      </div>

    </main>
  );
}

export default Sections;

