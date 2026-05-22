import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuoteStore } from '@target/quote-data-access';

export const quoteSummaryGuard: CanActivateFn = () => {
  const quoteStore = inject(QuoteStore);
  const router = inject(Router);

  return quoteStore.quote() !== undefined || router.createUrlTree(['/quote']);
};
