import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'quote',
  },
  {
    path: 'quote',
    loadChildren: () => import('@target/quote-feature').then(m => m.quoteRoutes),
  },
  {
    path: '**',
    redirectTo: 'quote',
  },
];
