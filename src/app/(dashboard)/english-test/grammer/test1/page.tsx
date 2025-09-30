"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { grammarQuestions } from "@/data/data";

export default function VercenRoundTest() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  const handleAnswer = (id: number, option: string, correct: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const calculateScore = () => {
    let correct = 0;
    grammarQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="flex flex-col items-center w-full py-12 px-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Grammar Mock Test
      </h1>

      <div className="w-full max-w-3xl space-y-6">
        {grammarQuestions.map((q) => (
          <div
            key={q.id}
            className="p-6 border rounded-2xl bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {q.id}. {q.question}
            </h2>
            <div className="grid gap-3">
              {q.options.map((option, i) => {
                const isSelected = selectedAnswers[q.id] === option;
                const isCorrect = option === q.correctAnswer;

                return (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => handleAnswer(q.id, option, q.correctAnswer)}
                    className={`justify-start w-full text-left ${
                      isSelected
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={calculateScore}
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Submit Test
      </Button>

      {score !== null && (
        <div className="mt-6 text-xl font-semibold text-gray-800">
          Your Score: {score} / {grammarQuestions.length}
        </div>
      )}
    </div>
  );
}
