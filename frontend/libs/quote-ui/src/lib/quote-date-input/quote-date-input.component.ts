import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxDatefieldModule, NxDatepickerInputEvent, NxNativeDateModule } from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

@Component({
  selector: 'ui-quote-date-input',
  imports: [NxFormfieldComponent, NxInputModule, NxDatefieldModule, NxNativeDateModule, NxErrorModule],
  templateUrl: './quote-date-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteDateInputComponent {
  label = input.required<string>();
  value = input<string | null | undefined>();
  error = input<string | null | undefined>();
  required = input<boolean>(false);

  valueChange = output<string>();

  protected readonly dateValue = computed(() => {
    const value = this.value();
    return value ? new Date(value) : null;
  });

  protected onDateChange(event: NxDatepickerInputEvent<Date>): void {
    const date = event.value;
    const isoDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      : '';

    this.valueChange.emit(isoDate);
  }
}
