import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFieldComponent } from '../quote-field.component';

describe('QuoteFieldComponent', () => {
  let component: QuoteFieldComponent;
  let fixture: ComponentFixture<QuoteFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
