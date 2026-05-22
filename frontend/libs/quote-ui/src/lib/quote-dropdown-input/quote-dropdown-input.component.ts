import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxDropdownComponent, NxDropdownItemComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';

@Component({
  selector: 'ui-quote-dropdown-input',
  imports: [NxFormfieldComponent, NxDropdownComponent, NxDropdownItemComponent, NxErrorModule],
  templateUrl: './quote-dropdown-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteDropdownInputComponent {
  label = input.required<string>();
  value = input<string | null | undefined>();
  options = input.required<readonly string[]>();
  error = input<string | null | undefined>();

  valueChange = output<string>();
}
