import { Routes } from '@angular/router';
import { ExamPage } from './exam/exam-page/exam-page';
import { LearningPage } from './learn/learning-page/learning-page';
import { QuestionListPage } from './question-list/question-list-page/question-list-page';

export const routes: Routes = [
  { path: 'exam', component: ExamPage },
  { path: 'learn', component: LearningPage },
  { path: 'questions', component: QuestionListPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];