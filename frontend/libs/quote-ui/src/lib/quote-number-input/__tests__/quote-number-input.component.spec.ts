import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteNumberInputComponent } from '../quote-number-input.component';

describe('QuoteNumberInputComponent', () => {
  let component: QuoteNumberInputComponent;
  let fixture: ComponentFixture<QuoteNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteNumberInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteNumberInputComponent);
    fixture.componentRef.setInput('label', 'Amount');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
