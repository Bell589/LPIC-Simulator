import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListPage } from './question-list-page';

describe('QuestionListPage', () => {
  let component: QuestionListPage;
  let fixture: ComponentFixture<QuestionListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
