import { TestBed } from '@angular/core/testing';
import { QuoteResponseDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';
import { of, throwError } from 'rxjs';

import { QuoteStore } from '../quote.store';
import { QuoteService } from '../services/quote.service';
import { InputState } from '../quote.store.interfaces';

jest.mock('@target/validations', () => ({
  InputDtoSchema: {
    safeParse: jest.fn(),
  },
}));

describe('QuoteStore', () => {
  let store: InstanceType<typeof QuoteStore>;
  let quoteService: jest.Mocked<QuoteService>;

  const mockQuoteResponse: QuoteResponseDto = {
    basisdaten: {
      geburtsdatum: '1990-01-01',
      versicherungsbeginn: '2024-01-01',
      garantieniveau: '90%',
      alterBeiRentenbeginn: 67,
      aufschubdauer: 30,
      beitragszahlungsdauer: 10,
    },
    leistungsmerkmale: {
      garantierteMindestrente: 50000,
      einmaligesGarantiekapital: 25000,
      todesfallleistungAbAltersrentenbezug: 40000,
    },
    beitrag: {
      einmalbeitrag: 0,
      beitragsdynamik: '1,5%',
    },
  };

  beforeEach(() => {
    quoteService = {
      calculateQuote: jest.fn(),
    } as unknown as jest.Mocked<QuoteService>;

    TestBed.configureTestingModule({
      providers: [{ provide: QuoteService, useValue: quoteService }],
    });

    store = TestBed.inject(QuoteStore);
  });

  describe('updateInputs', () => {
    it('should update state when validation succeeds', () => {
      const input = { key: 'beitrag' as keyof InputState, value: 2000 };

      (InputDtoSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });

      store.updateInputs(input);

      expect(store.input().beitrag.value).toBe(2000);
      expect(store.input().beitrag.valid).toBe(true);
      expect(store.input().beitrag.error).toBeNull();
    });

    it('should update state with validation errors when validation fails', () => {
      const input = { key: 'beitrag' as keyof InputState, value: -1 };

      (InputDtoSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: {
          issues: [{ path: ['beitrag'], message: 'Beitrag must be positive' }],
        },
      });

      store.updateInputs(input);

      expect(store.input().beitrag.value).toBe(-1);
      expect(store.input().beitrag.valid).toBe(false);
      expect(store.input().beitrag.error).toBe('Beitrag must be positive');
    });
  });

  describe('calculate', () => {
    it('should update quote when calculation succeeds', () => {
      (InputDtoSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });
      quoteService.calculateQuote.mockReturnValue(of(mockQuoteResponse));

      store.calculate();

      expect(store.quote()).toEqual(mockQuoteResponse);
      expect(store.quoteStatus()).toBe('success');
      expect(quoteService.calculateQuote).toHaveBeenCalled();
    });

    it('should handle validation failure', () => {
      (InputDtoSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
      });

      store.calculate();

      expect(store.quoteStatus()).toBe('idle');
      expect(quoteService.calculateQuote).not.toHaveBeenCalled();
    });

    it('should handle API errors', () => {
      (InputDtoSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
      });
      const error = new Error('API Error');

      quoteService.calculateQuote.mockReturnValue(throwError(() => error));

      store.calculate();

      expect(store.quoteStatus()).toBe('error');
      expect(quoteService.calculateQuote).toHaveBeenCalled();
    });
  });
});
