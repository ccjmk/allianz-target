import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteDropdownInputComponent } from '../quote-dropdown-input.component';

describe('QuoteDropdownInputComponent', () => {
  let component: QuoteDropdownInputComponent;
  let fixture: ComponentFixture<QuoteDropdownInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteDropdownInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteDropdownInputComponent);
    fixture.componentRef.setInput('label', 'Option');
    fixture.componentRef.setInput('options', ['A', 'B']);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
