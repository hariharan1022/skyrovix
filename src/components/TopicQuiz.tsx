import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface Q {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation?: string | null;
}

interface TopicQuizProps {
  questions: Q[];
  onComplete: (score: number, total: number) => void;
}

export function TopicQuiz({ questions, onComplete }: TopicQuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = () => {
    let s = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correct_index) s++;
    }
    setScore(s);
    setSubmitted(true);
    onComplete(s, questions.length);
  };

  const passed = score >= questions.length;

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className={`rounded-xl p-4 ${passed ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50" : "bg-red-50 dark:bg-red-950/20 border border-red-200/50"}`}>
          <div className="flex items-center gap-2">
            {passed ? <CheckCircle2 className="size-5 text-emerald-600" /> : <XCircle className="size-5 text-red-600" />}
            <div>
              <p className="font-semibold text-sm">{passed ? "Passed!" : "Not quite"}</p>
              <p className="text-xs text-muted-foreground">Score: {score}/{questions.length}</p>
            </div>
          </div>
        </div>
        {questions.map((q, i) => (
          <div key={q.id} className={`rounded-xl border p-3 text-xs ${
            answers[q.id] === q.correct_index
              ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20"
              : "border-red-200 bg-red-50/50 dark:bg-red-950/20"
          }`}>
            <p className="font-medium mb-2">{i + 1}. {q.question}</p>
            <div className="space-y-1">
              {q.options.map((opt, oi) => (
                <div key={oi} className={`px-3 py-1.5 rounded-lg ${
                  oi === q.correct_index
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                    : oi === answers[q.id]
                    ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    : "bg-muted/30"
                }`}>
                  {String.fromCharCode(65 + oi)}. {opt}
                  {oi === q.correct_index && <CheckCircle2 className="size-3 inline ml-1 text-emerald-600" />}
                </div>
              ))}
            </div>
            {q.explanation && (
              <div className="mt-2 flex items-start gap-1.5 text-muted-foreground">
                <HelpCircle className="size-3 mt-0.5 shrink-0" />
                <p>{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Answer all {questions.length} questions to continue:</p>
      {questions.map((q, i) => (
        <div key={q.id} className="rounded-xl border border-border/50 p-3">
          <p className="text-sm font-medium mb-2">{i + 1}. {q.question}</p>
          <div className="space-y-1">
            {q.options.map((opt, oi) => {
              const selected = answers[q.id] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                    selected
                      ? "bg-[#07284a]/10 text-[#07284a] dark:bg-[#07284a]/30 dark:text-[#07284a]/80 ring-1 ring-[#07284a]/30"
                      : "bg-muted/30 hover:bg-muted/60"
                  }`}
                >
                  {String.fromCharCode(65 + oi)}. {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <Button
        className="brand-gradient text-white border-0 rounded-xl h-9 text-xs"
        disabled={!allAnswered}
        onClick={handleSubmit}
      >
        Submit Answers
      </Button>
    </div>
  );
}
