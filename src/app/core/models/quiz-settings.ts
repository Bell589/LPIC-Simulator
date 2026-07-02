export type Mode = 'practice' | 'exam';
export type Order = 'normal' | 'random';
export type QuestionTypeFilter = 'all' | 'sc' | 'mc' | 'fi';

export interface QuizSettings {
  catalog: string;
  mode: Mode;
  order: Order;
  questionType: QuestionTypeFilter;
  numberOfQuestions: number;
  fromQuestion: number;
  toQuestion: number;
  timePerQuestionSeconds: number;
}