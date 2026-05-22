import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

@Component({
  selector: 'ui-quote-number-input',
  imports: [NxFormfieldComponent, NxInputModule, NxErrorModule],
  templateUrl: './quote-number-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteNumberInputComponent {
  label = input.required<string>();
  value = input<number | null | undefined>();
  error = input<string | null | undefined>();

  valueChange = output<number>();

  protected onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;

    this.valueChange.emit(+raw);
  }
}
