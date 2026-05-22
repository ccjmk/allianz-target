import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { QuoteResponseDto } from '@target/interfaces';
import { Input, InputState, QuoteStore } from '@target/quote-data-access';

import { InputFormComponent } from '../input-form.component';

describe('InputFormComponent', () => {
  let harness: RouterTestingHarness;
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;
  let mockedStore: {
    updateInputs: jest.Mock;
    calculate: jest.Mock;
    resetQuote: jest.Mock;
    input: jest.Mock;
    quote: jest.Mock;
    quoteStatus: jest.Mock;
    isCalculating: jest.Mock;
    hasErrors: jest.Mock;
  };

  beforeEach(async () => {
    const mockState: InputState = {
      birthdate: { value: '1990-12-31', valid: true, error: null },
      leistungsVorgabe: { value: 'Beitrag', valid: true, error: null },
      beitrag: { value: 1000, valid: true, error: null },
      berechnungDerLaufzeit: {
        value: 'Alter bei Rentenbeginn',
        valid: true,
        error: null,
      },
      laufzeit: { value: 10, valid: true, error: null },
      beitragszahlungsweise: {
        value: 'Einmalbeitrag',
        valid: true,
        error: null,
      },
      rentenzahlungsweise: {
        value: 'Monatliche Renten',
        valid: true,
        error: null,
      },
    };
    const mockQuote: QuoteResponseDto = {
      basisdaten: {
        geburtsdatum: '',
        versicherungsbeginn: '',
        garantieniveau: '',
        alterBeiRentenbeginn: 0,
        aufschubdauer: 0,
        beitragszahlungsdauer: 0,
      },
      leistungsmerkmale: {
        garantierteMindestrente: 0,
        einmaligesGarantiekapital: 0,
        todesfallleistungAbAltersrentenbezug: 0,
      },
      beitrag: {
        einmalbeitrag: 0,
        beitragsdynamik: '',
      },
    };

    mockedStore = {
      updateInputs: jest.fn(),
      calculate: jest.fn(),
      resetQuote: jest.fn(),
      input: jest.fn(() => mockState),
      quote: jest.fn(() => mockQuote),
      quoteStatus: jest.fn(() => 'idle'),
      isCalculating: jest.fn(() => false),
      hasErrors: jest.fn(() => false),
    };

    TestBed.configureTestingModule({
      imports: [InputFormComponent],
      providers: [
        provideRouter([{ path: 'quote', component: InputFormComponent }]),
        { provide: QuoteStore, useValue: mockedStore }
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();

    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update inputs through the store', () => {
    const input: Input = { key: 'beitrag', value: 2000 };

    component.updateInputs(input);

    expect(mockedStore.updateInputs).toHaveBeenCalledWith(input);
  });

  it('should calculate through the store', () => {
    component.calculate();

    expect(mockedStore.calculate).toHaveBeenCalled();
  });

  it('should handle string inputs', () => {
    const input: Input = { key: 'leistungsVorgabe', value: 'Rente' };

    component.updateInputs(input);

    expect(mockedStore.updateInputs).toHaveBeenCalledWith(input);
  });

  it('should handle numeric inputs', () => {
    const input: Input = { key: 'laufzeit', value: 15 };

    component.updateInputs(input);

    expect(mockedStore.updateInputs).toHaveBeenCalledWith(input);
  });
});
