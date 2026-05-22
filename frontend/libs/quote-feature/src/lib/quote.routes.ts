import { Route } from '@angular/router';

import { InputFormComponent } from './input-form/input-form.component';
import { QuoteSummaryComponent } from './quote-summary/quote-summary.component';
import { quoteSummaryGuard } from './quote-summary/quote-summary.guard';


export const quoteRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: InputFormComponent,
    },
    {
        path: 'summary',
        component: QuoteSummaryComponent,
        canActivate: [quoteSummaryGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];