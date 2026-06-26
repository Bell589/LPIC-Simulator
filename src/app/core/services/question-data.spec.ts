import { TestBed } from '@angular/core/testing';

import { QuestionData } from './question-data';

describe('QuestionData', () => {
  let service: QuestionData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
