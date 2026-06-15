
import { create } from 'zustand';
import type { FormState , Question , ThemeMode } from '../types/form';
import { persist } from 'zustand/middleware';

export const useFormStore = create<FormState>()(
  persist((set) => ({
  questions: [
    { id: '1', type: 'text', title: 'Welcome! What is your name?', required: true }
  ],
  selectedQuestionId: '1',
  mode: 'edit',
  theme: 'light',

  setMode: (mode) => set({ mode }),
  setTheme: (theme) => set({ theme }),

  addQuestion: (type) => set((state) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type,
      title: `Untitled ${type} question`,
      required: false,
      options: type === 'multiple-choice' ? ['Option 1'] : undefined,
    };
    return {
      questions: [...state.questions, newQuestion],
      selectedQuestionId: newQuestion.id,
    };
  }),

  deleteQuestion: (id) => set((state) => {
    const remaining = state.questions.filter((q) => q.id !== id);
    return {
      questions: remaining,
      selectedQuestionId: state.selectedQuestionId === id 
        ? (remaining[0]?.id || null) 
        : state.selectedQuestionId,
    };
  }),

  selectQuestion: (id) => set({ selectedQuestionId: id }),

  updateQuestion: (id, updates) => set((state) => ({
    questions: state.questions.map((q) => 
      q.id === id ? { ...q, ...updates } : q
    ),
  })),

  reorderQuestions: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.questions);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { questions: result };
  }),
}),{
  name: 'formcraft-storage',
  })
);