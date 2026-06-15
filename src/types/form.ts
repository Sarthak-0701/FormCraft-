export type QuestionType = 'text' | 'multiple-choice' | 'number';
export type ThemeMode = 'light' | 'dark';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[];
}

export interface FormState {
  questions: Question[];
  selectedQuestionId: string | null;
  mode: 'edit' | 'preview';
  theme: ThemeMode; // Added
  
  // Actions
  setMode: (mode: 'edit' | 'preview') => void;
  setTheme: (theme: ThemeMode) => void; // Added
  addQuestion: (type: QuestionType) => void;
  deleteQuestion: (id: string) => void;
  selectQuestion: (id: string | null) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  reorderQuestions: (startIndex: number, endIndex: number) => void;
}