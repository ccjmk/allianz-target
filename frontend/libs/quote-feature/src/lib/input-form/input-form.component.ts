import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxColComponent, NxLayoutComponent, NxRowComponent } from '@aposin/ng-aquila/grid';
import { NxStatusIconComponent } from '@aposin/ng-aquila/icon';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { Input, QuoteStore } from '@target/quote-data-access';
import { QuoteDateInputComponent, QuoteDropdownInputComponent, QuoteNumberInputComponent } from '@target/quote-ui';
import { beitragszahlungsweiseOptions, berechnungDerLaufzeitOptions, leistungsVorgabeOptions, rentenzahlungsweiseOptions } from '@target/validations';

@Component({
  selector: 'feat-input-form',
  imports: [
    CommonModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxButtonModule,
    NxSpinnerComponent,
    NxStatusIconComponent,
    QuoteDateInputComponent,
    QuoteDropdownInputComponent,
    QuoteNumberInputComponent,
  ],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
})
export class InputFormComponent {
  protected readonly inputStore = inject(QuoteStore);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly today = new Date();

  constructor() {
    this.inputStore.resetQuote();

    effect(() => {
      if (this.inputStore.quoteStatus() === 'success') {
        this.router.navigate(['summary'], { relativeTo: this.route });
      }
    });
  }

  updateInputs(input: Input): void {
    this.inputStore.updateInputs(input);
  }

  calculate(): void {
    this.inputStore.calculate();
  }

  protected readonly leistungsVorgabeOptions = leistungsVorgabeOptions;
  protected readonly berechnungDerLaufzeitOptions = berechnungDerLaufzeitOptions;
  protected readonly beitragszahlungsweiseOptions = beitragszahlungsweiseOptions;
  protected readonly rentenzahlungsweiseOptions = rentenzahlungsweiseOptions;
}
