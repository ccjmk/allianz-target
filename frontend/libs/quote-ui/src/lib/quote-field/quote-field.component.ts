import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-quote-field',
  imports: [],
  templateUrl: './quote-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteFieldComponent {
  label = input.required<string | undefined>();
  value = input<string | number | undefined | null>();
}
