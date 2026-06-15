import { useFormStore } from '../../store/useFormStore';

export default function Workspace() {
  const { questions, selectedQuestionId, updateQuestion } = useFormStore();
  const activeQuestion = questions.find((q) => q.id === selectedQuestionId);

  if (!activeQuestion) {
    return (
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors duration-200">
        Select or add a question block to begin editing.
      </div>
    );
  }

  const handleAddOption = () => {
    const currentOptions = activeQuestion.options || [];
    updateQuestion(activeQuestion.id, {
      options: [...currentOptions, `Option ${currentOptions.length + 1}`],
    });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const currentOptions = [...(activeQuestion.options || [])];
    currentOptions[index] = value;
    updateQuestion(activeQuestion.id, { options: currentOptions });
  };

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-900/30 p-12 overflow-y-auto flex justify-center transition-colors duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-8 shadow-sm h-fit space-y-6 transition-colors duration-200">
        {/* Main Prompt Input */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Block Configuration</label>
          <input
            type="text"
            value={activeQuestion.title}
            onChange={(e) => updateQuestion(activeQuestion.id, { title: e.target.value })}
            className="w-full mt-2 text-2xl font-semibold border-b border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 outline-none pb-2 transition"
            placeholder="Type your question prompt here..."
          />
        </div>

        {/* Choice Configuration Engine */}
        {activeQuestion.type === 'multiple-choice' && (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 block">Answer Choices</label>
            {(activeQuestion.options || []).map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => handleUpdateOption(i, e.target.value)}
                className="w-full px-4 py-2 border dark:border-slate-700 bg-transparent text-slate-950 dark:text-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none transition"
              />
            ))}
            <button
              onClick={handleAddOption}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 block pt-1"
            >
              + Add Choice Option
            </button>
          </div>
        )}

        {/* Configuration Footer Controls */}
        <div className="pt-4 border-t dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="required-toggle"
              checked={activeQuestion.required}
              onChange={(e) => updateQuestion(activeQuestion.id, { required: e.target.checked })}
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400 border-slate-300 dark:border-slate-600 rounded bg-transparent"
            />
            <label htmlFor="required-toggle" className="text-sm text-slate-600 dark:text-slate-400 select-none">
              Mandatory Entry Field
            </label>
          </div>
          <span className="text-xs font-mono uppercase bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
            Type: {activeQuestion.type}
          </span>
        </div>
      </div>
    </main>
  );
}