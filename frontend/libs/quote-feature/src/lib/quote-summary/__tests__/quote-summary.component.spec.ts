import { TestBed } from '@angular/core/testing';

import { QuoteSummaryComponent } from '../quote-summary.component';

describe('QuoteSummaryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteSummaryComponent],
    }).compileComponents();
  });

  it('should render', () => {
    const fixture = TestBed.createComponent(QuoteSummaryComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});