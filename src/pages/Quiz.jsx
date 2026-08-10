import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flag,
  Send,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import QuestionPalette from "../components/QuestionPalette";

import {
  TIME_PER_ATTEMPT,
  markQuestionsAttempted,
  saveAttemptResult,
  saveCompletedSection,
  saveCurrentAttempt,
  getCurrentAttempt,
  clearCurrentAttempt,
} from "../utils/quizUtils";

function Quiz({
  questions,
  sectionId,
  studentName,
  onComplete,
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [marked, setMarked] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState(TIME_PER_ATTEMPT);

  const [submitted, setSubmitted] =
    useState(false);

  const currentQuestion =
    questions[currentIndex];

  useEffect(() => {
    const saved =
      getCurrentAttempt();

    if (
      saved &&
      saved.sectionId === sectionId
    ) {
      setCurrentIndex(
        saved.currentIndex || 0
      );

      setAnswers(
        saved.answers || {}
      );

      setMarked(
        saved.marked || []
      );

      setTimeLeft(
        saved.timeLeft ??
          TIME_PER_ATTEMPT
      );
    }
  }, [sectionId]);

  useEffect(() => {
    if (submitted) return;

    const timer =
      setInterval(() => {
        setTimeLeft(
          (previous) => {
            if (previous <= 1) {
              clearInterval(timer);

              handleSubmit(
                true
              );

              return 0;
            }

            return previous - 1;
          }
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    if (!questions.length) return;

    saveCurrentAttempt({
      sectionId,
      currentIndex,
      answers,
      marked,
      timeLeft,
      questionIds:
        questions.map(
          (q) => q.id
        ),
    });
  }, [
    sectionId,
    currentIndex,
    answers,
    marked,
    timeLeft,
    questions,
  ]);

  function selectAnswer(index) {
    setAnswers(
      (previous) => ({
        ...previous,
        [currentQuestion.id]:
          index,
      })
    );
  }

  function toggleMark() {
    setMarked(
      (previous) =>
        previous.includes(
          currentQuestion.id
        )
          ? previous.filter(
              (id) =>
                id !==
                currentQuestion.id
            )
          : [
              ...previous,
              currentQuestion.id,
            ]
    );
  }

  function handleSubmit(
    auto = false
  ) {
    if (submitted) return;

    setSubmitted(true);

    let correct = 0;

    questions.forEach(
      (question) => {
        if (
          answers[question.id] ===
          question.answer
        ) {
          correct++;
        }
      }
    );

    const attempted =
      Object.keys(answers)
        .length;

    const wrong =
      attempted - correct;

    const unattempted =
      questions.length -
      attempted;

    const percentage =
      Math.round(
        (correct /
          questions.length) *
          100
      );

    const result = {
      id: Date.now(),

      studentName,

      sectionId,

      total:
        questions.length,

      correct,

      wrong,

      unattempted,

      percentage,

      timeLeft,

      autoSubmitted: auto,

      date:
        new Date().toISOString(),
    };

    markQuestionsAttempted(
      questions.map(
        (question) =>
          question.id
      )
    );

    saveCompletedSection(
      sectionId
    );

    saveAttemptResult(
      result
    );

    clearCurrentAttempt();

    onComplete(result);
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="app-bg">

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
              Section {sectionId}
            </p>

            <h1 className="text-xl font-black text-white">
              भारतीय संविधान Mock Test
            </h1>

          </div>

          <Timer
            timeLeft={timeLeft}
          />

        </div>

        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px]">

          <div>

            <QuestionCard
              question={
                currentQuestion
              }
              selectedAnswer={
                answers[
                  currentQuestion.id
                ]
              }
              onAnswer={
                selectAnswer
              }
              isMarked={marked.includes(
                currentQuestion.id
              )}
              onToggleMark={
                toggleMark
              }
            />

            <div className="mt-5 flex items-center justify-between gap-3">

              <button
                disabled={
                  currentIndex === 0
                }
                onClick={() =>
                  setCurrentIndex(
                    (index) =>
                      index - 1
                  )
                }
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
              >

                <ArrowLeft size={16} />

                Previous

              </button>

              {currentIndex ===
              questions.length - 1 ? (
                <button
                  onClick={() =>
                    handleSubmit()
                  }
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs font-black text-white shadow-lg"
                >

                  <Send size={16} />

                  Submit Test

                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (index) =>
                        index + 1
                    )
                  }
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-xs font-black text-white shadow-lg"
                >

                  Next

                  <ArrowRight
                    size={16}
                  />

                </button>
              )}

            </div>

          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <QuestionPalette
              questions={
                questions
              }
              currentIndex={
                currentIndex
              }
              answers={answers}
              marked={marked}
              onSelect={
                setCurrentIndex
              }
            />

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Quiz;