import { Answer } from './answer';

export type QuestionType = 'sc' | 'mc' | 'fi';

export interface Question {
  id: number;
  catalog: string;
  type: QuestionType;
  text: string;
  answers: Answer[];
}