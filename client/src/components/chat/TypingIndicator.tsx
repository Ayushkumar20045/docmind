import { useEffect, useState } from "react";
import {
  FileSearch,
  Search,
  Brain,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    text: "Reading your document...",
    icon: FileSearch,
  },
  {
    text: "Searching relevant pages...",
    icon: Search,
  },
  {
    text: "Understanding the context...",
    icon: Brain,
  },
  {
    text: "Generating your answer...",
    icon: Sparkles,
  },
];

function TypingIndicator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % steps.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[index].icon;

  return (
    <div className="flex justify-start">
      <div className="max-w-xl rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 shadow-lg">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
            <CurrentIcon
              size={20}
              className="animate-pulse text-blue-400"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-white transition-all duration-300">
              {steps[index].text}
            </p>

            <div className="mt-2 flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default TypingIndicator;