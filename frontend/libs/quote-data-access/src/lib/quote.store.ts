import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { QuoteRequestDto, QuoteResponseDto, QuoteStatus } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';
import { catchError, EMPTY, filter, map, pipe, switchMap, tap, timeout } from 'rxjs';

import { Input, InputState } from './quote.store.interfaces';
import { QuoteService } from './services/quote.service';

const QUOTE_TIMEOUT_MS = 2000;

const initialInput: InputState = {
  birthdate: { value: '', valid: true, error: null },
  leistungsVorgabe: { value: 'Beitrag', valid: true, error: null },
  beitrag: { value: 1000, valid: true, error: null },
  berechnungDerLaufzeit: {
    value: 'Alter bei Rentenbeginn',
    valid: true,
    error: null,
  },
  laufzeit: { value: 10, valid: true, error: null },
  beitragszahlungsweise: { value: 'Einmalbeitrag', valid: true, error: null },
  rentenzahlungsweise: { value: 'Monatliche Renten', valid: true, error: null }
};

export const QuoteStore = signalStore(
  { providedIn: 'root' },
  withState({
    input: initialInput,
    quote: undefined as QuoteResponseDto | undefined,
    quoteStatus: 'idle' as QuoteStatus,
    error: null as string | null,
  }),
  withComputed(({ quoteStatus, input }) => ({
    isCalculating: computed(() => quoteStatus() === 'loading'),
    hasErrors: computed(() => !InputDtoSchema.safeParse(transformUiStateToInputDto(input())).success),
  })),
  withMethods((store, quoteService = inject(QuoteService)) => ({
    updateInputs: (input: Input): void => {
      const nextInputState = {
        ...store.input(),
        [input.key]: { value: input.value, valid: true, error: null },
      };
      const validationResult = InputDtoSchema.safeParse(transformUiStateToInputDto(nextInputState));

      if (validationResult.success) {
        patchState(store, { input: nextInputState });
        return;
      }

      const validatedState = validationResult.error.issues.reduce(
        (state, { path, message }) => ({
          ...state,
          [path[0]]: {
            ...state[path[0] as keyof InputState],
            valid: false,
            error: message,
          },
        }),
        nextInputState,
      );

      patchState(store, { input: validatedState });
    },
    resetQuote: (): void => {
      patchState(store, { quote: undefined, quoteStatus: 'idle', error: null });
    },
    calculate: rxMethod<void>(pipe(
      map(() => InputDtoSchema.safeParse(transformUiStateToInputDto(store.input()))),
      tap(result => patchState(store, { quoteStatus: result.success ? 'loading' : 'idle' })),
      filter(result => result.success),
      switchMap(result => quoteService.calculateQuote(result.data).pipe(
        timeout(QUOTE_TIMEOUT_MS),
        tap(quote => patchState(store, {
          quote,
          quoteStatus: 'success',
          error: null,
        })),
        catchError(err => {
          patchState(store, {
            quoteStatus: err.name === 'TimeoutError' ? 'aborted' : 'error',
            quote: undefined,
            error: err.error?.message || 'An unknown error occurred, please try again.',
          });
          return EMPTY;
        }),
      )),
    )),
  })),
);

const transformUiStateToInputDto = (state: InputState): QuoteRequestDto => Object.entries(state).reduce((acc, [key, { value }]) => ({ ...acc, [key]: value }), {} as QuoteRequestDto);
