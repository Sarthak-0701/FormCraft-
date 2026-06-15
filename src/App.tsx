import { useEffect } from 'react';
import { useFormStore } from './store/useFormStore';
import Sidebar from './components/Editor/Sidebar';
import Workspace from './components/Editor/Workspace';
import FormViewer from './components/Preview/FormViewer';

export default function App() {
  const mode = useFormStore((state) => state.mode);
  const setMode = useFormStore((state) => state.setMode);
  const theme = useFormStore((state) => state.theme);
  const setTheme = useFormStore((state) => state.setTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col px-5 py-2 font-sans transition-colors duration-200">

      <header className="h-16 border-b rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 flex items-center justify-between px-6 z-10 transition-colors duration-200">
        <span className="font-bold tracking-tight text-indigo-600 dark:text-indigo-400 text-lg">FormCraft</span>
        
        <div className="flex items-center gap-4">

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xl border border-transparent dark:border-slate-600 transition"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className="flex gap-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg border dark:border-slate-600">
            <button
              onClick={() => setMode('edit')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                mode === 'edit' 
                  ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Create
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                mode === 'preview' 
                  ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600 dark:text-white' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Preview Flow
            </button>
          </div>
        </div>
      </header>

      {mode === 'edit' ? (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Workspace />
        </div>
      ) : (
        <FormViewer />
      )}
    </div>
  );
}