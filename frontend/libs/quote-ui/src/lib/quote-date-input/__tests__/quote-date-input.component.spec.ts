import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDateInputComponent } from '../quote-date-input.component';

describe('QuoteDateInputComponent', () => {
  let component: QuoteDateInputComponent;
  let fixture: ComponentFixture<QuoteDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteDateInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteDateInputComponent);
    fixture.componentRef.setInput('label', 'Birthdate');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
