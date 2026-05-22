import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  NxCardComponent
} from '@aposin/ng-aquila/card';

@Component({
  selector: 'ui-quote-card',
  imports: [NxCardComponent],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCardComponent {
  title = input.required<string>();
}
