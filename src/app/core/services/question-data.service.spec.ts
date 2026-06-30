import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { QuestionDataService } from './question-data.service';
import { Question } from '../models/question';

describe('QuestionDataService', () => {

  let service: QuestionDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(QuestionDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load questions by catalog', () => {
    const mockQuestions: Question[] = [
      {
        id: 1,
        catalog: '101a',
        type: 'sc',
        text: 'Testfrage',
        answers: [
          { text: 'Antwort A', isCorrect: true },
          { text: 'Antwort B', isCorrect: false }
        ]
      }
    ];

    service.getQuestionsByCatalog('101a').subscribe(questions => {
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne('http://localhost:3000/questions?catalog=101a');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);
  });

  it('should load a single question by id', () => {
    const mockQuestion: Question = {
      id: 1,
      catalog: '101a',
      type: 'sc',
      text: 'Testfrage',
      answers: [
        { text: 'Antwort A', isCorrect: true },
        { text: 'Antwort B', isCorrect: false }
      ]
    };

    service.getQuestionById(1).subscribe(question => {
      expect(question).toEqual(mockQuestion);
    });

    const req = httpMock.expectOne('http://localhost:3000/questions/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestion);
  });

});