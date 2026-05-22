import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  QuoteCardComponent
} from '../quote-card.component';

describe('QuoteCard', () => {
  let component: QuoteCardComponent;
  let fixture: ComponentFixture<QuoteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
