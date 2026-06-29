import { Answer } from './answer';
import { QuestionType } from './question-type';

export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  answers: Answer[];
  hint: string;
}