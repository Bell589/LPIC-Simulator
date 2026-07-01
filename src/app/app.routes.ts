import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'LPIC Simulator',
    loadComponent: () => import('./home/home-page/home-page')
      .then(m => m.HomePage)
  },
  {
    path: 'learning',
    title: 'Übungsmodus',
    loadComponent: () => import('./learn/learning-page/learning-page')
      .then(m => m.LearningPage)
  },
  {
    path: 'exam',
    title: 'Prüfungsmodus',
    loadComponent: () => import('./exam/exam-page/exam-page')
      .then(m => m.ExamPage)
  },
  {
    path: 'list',
    title: 'Fragenliste',
    loadComponent: () => import('./question-list/question-list-page/question-list-page')
      .then(m => m.QuestionListPage)
  },
  {
    path: 'list/:id',
    title: 'Frage-Detail',
    loadComponent: () => import('./question-list/question-detail-page/question-detail-page')
      .then(m => m.QuestionDetailPage)
  },
  {
    path: 'result',
    title: 'Ergebnis',
    loadComponent: () => import('./result/result-page/result-page')
      .then(m => m.ResultPage)
  },
  {
    path: 'review',
    title: 'Auswertung',
    loadComponent: () => import('./review/review-page/review-page')
      .then(m => m.ReviewPage)
  }
];