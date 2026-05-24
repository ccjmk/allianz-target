import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxColComponent, NxLayoutComponent, NxRowComponent } from "@aposin/ng-aquila/grid";
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { QuoteStore } from '@target/quote-data-access'
import { QuoteCardComponent, QuoteFieldComponent } from "@target/quote-ui";

@Component({
    imports: [CommonModule, NxLayoutComponent, NxRowComponent, NxColComponent, NxButtonModule, QuoteFieldComponent, QuoteCardComponent],
    selector: 'feat-quote-summary',
    templateUrl: './quote-summary.component.html',
})
export class QuoteSummaryComponent {
    private readonly viewportService = inject(NxViewportService);
    private readonly router = inject(Router);

    protected readonly quoteStore = inject(QuoteStore);

    returnToInput(): void {
        this.quoteStore.resetQuote();
        this.router.navigate(['/quote']);
    }
}
