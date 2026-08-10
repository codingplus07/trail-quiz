import {
  Timer as TimerIcon,
} from "lucide-react";

function Timer({
  timeLeft,
}) {
  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  const danger =
    timeLeft <= 60;

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-4 py-2 ${
        danger
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
      }`}
    >

      <TimerIcon size={17} />

      <span className="font-black tabular-nums">
        {String(minutes).padStart(
          2,
          "0"
        )}
        :
        {String(seconds).padStart(
          2,
          "0"
        )}
      </span>

    </div>
  );
}

export default Timer;