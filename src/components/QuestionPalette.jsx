import {
  Bookmark,
  Circle,
} from "lucide-react";

function QuestionPalette({
  questions,
  currentIndex,
  answers,
  marked,
  onSelect,
}) {
  return (
    <div className="glass-card rounded-2xl p-4">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-sm font-black text-white">
          Questions
        </h3>

        <span className="text-[10px] font-bold text-slate-500">
          {questions.length}
        </span>

      </div>

      <div className="grid grid-cols-5 gap-2">

        {questions.map(
          (question, index) => {
            const answered =
              answers[question.id] !==
              undefined;

            const isMarked =
              marked.includes(
                question.id
              );

            return (
              <button
                key={question.id}
                onClick={() =>
                  onSelect(index)
                }
                className={`relative h-9 rounded-lg text-xs font-black transition ${
                  index === currentIndex
                    ? "bg-indigo-600 text-white"
                    : answered
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-white/5 text-slate-500 hover:bg-white/10"
                }`}
              >

                {index + 1}

                {isMarked && (
                  <Bookmark
                    size={8}
                    fill="currentColor"
                    className="absolute right-1 top-1 text-yellow-400"
                  />
                )}

              </button>
            );
          }
        )}

      </div>

      <div className="mt-4 space-y-2 text-[9px] font-bold text-slate-500">

        <div className="flex items-center gap-2">
          <Circle
            size={8}
            className="fill-indigo-500 text-indigo-500"
          />
          Current
        </div>

        <div className="flex items-center gap-2">
          <Circle
            size={8}
            className="fill-emerald-500 text-emerald-500"
          />
          Answered
        </div>

        <div className="flex items-center gap-2">
          <Bookmark
            size={9}
            className="text-yellow-400"
          />
          Review
        </div>

      </div>

    </div>
  );
}

export default QuestionPalette;