import { useState } from 'react';
import { useFormStore } from '../../store/useFormStore';

export default function FormViewer() {
  const questions = useFormStore((state) => state.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentIndex];

  if (questions.length === 0) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors duration-200">
        No interactive blocks active inside this form structure yet.
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`Form Complete! Check Console log output.\n\n${JSON.stringify(answers, null, 2)}`);
      console.log('Final Form Context Output Payload: ', answers);
    }
  };

  const saveResponse = (val: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
  };

  return (
    <div className="flex-1 bg-white dark:bg-slate-900 flex flex-col justify-center items-center px-4 relative transition-colors duration-200">
      {/* Structural Progress Line */}
      <div className="absolute top-0 left-0 h-1 bg-indigo-600 dark:bg-indigo-500 transition-all duration-300" 
           style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />

      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-2">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-slate-900 dark:text-white">
            {currentQuestion?.title}
            {currentQuestion?.required && <span className="text-indigo-500 dark:text-indigo-400 ml-1">*</span>}
          </h2>
        </div>

        {/* Dynamic Display Layout Generator */}
        <div className="py-2">
          {currentQuestion?.type === 'text' && (
            <input
              type="text"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => saveResponse(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full text-xl border-b-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 outline-none pb-2 transition-colors"
            />
          )}

          {currentQuestion?.type === 'number' && (
            <input
              type="number"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => saveResponse(e.target.value)}
              placeholder="0"
              className="w-full text-xl border-b-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 outline-none pb-2 transition-colors"
            />
          )}

          {currentQuestion?.type === 'multiple-choice' && (
            <div className="space-y-2.5">
              {(currentQuestion.options || []).map((opt, i) => (
                <button
                  key={i}
                  onClick={() => saveResponse(opt)}
                  className={`w-full text-left px-5 py-3 border-2 rounded-xl text-lg transition font-medium ${
                    answers[currentQuestion.id] === opt
                      ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span className="inline-block bg-white dark:bg-slate-700 border dark:border-slate-600 px-2 py-0.5 rounded text-xs font-mono shadow-sm mr-3 text-slate-400 dark:text-slate-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls Section */}
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-xl shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-[0.98] transition"
          >
            {currentIndex === questions.length - 1 ? 'Submit Answers' : 'OK ✓'}
          </button>
          
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition"
            >
              Go back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}