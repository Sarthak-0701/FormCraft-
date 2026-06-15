import { useFormStore } from '../../store/useFormStore';
import type { QuestionType } from '../../types/form';

export default function Sidebar() {
  const { questions, selectedQuestionId, addQuestion, selectQuestion, deleteQuestion } = useFormStore();

  const blocks: { type: QuestionType; label: string }[] = [
    { type: 'text', label: 'Short Text' },
    { type: 'multiple-choice', label: 'Multiple Choice' },
    { type: 'number', label: 'Number Input' },
  ];

  return (
    <aside className="w-80 bg-white rounded-lg dark:bg-slate-800 border-r dark:border-slate-700 flex flex-col h-full transition-colors duration-200">
      {/* Block Adder Section */}
      <div className="p-4 border-b dark:border-slate-700">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Add Content Blocks
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {blocks.map((b) => (
            <button
              key={b.type}
              onClick={() => addQuestion(b.type)}
              className="flex items-center justify-start px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition text-left"
            >
              🚀 {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Structure Navigation Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Form Structure
        </h3>
        <div className="space-y-1">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              onClick={() => selectQuestion(q.id)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition text-sm ${
                selectedQuestionId === q.id 
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="truncate pr-2 font-medium">
                {idx + 1}. {q.title || <span className="italic text-slate-400 dark:text-slate-500">Empty Question</span>}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(q.id);
                }}
                className="text-slate-400 hover:text-red-500 p-1 rounded transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}