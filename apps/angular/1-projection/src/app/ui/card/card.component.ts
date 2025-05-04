import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list(); track item.id) {
          <ng-container
            *ngTemplateOutlet="
              listView;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAddbtnClick()">
        Add
      </button>
    </div>
  `,
  imports: [CommonModule],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  @Output() onAddButtonClick = new EventEmitter();
  @ContentChild('listView') listView!: TemplateRef<any>;

  ngOnInit() {
    debugger;
    console.log(this.listView);
  }

  onAddbtnClick() {
    this.onAddButtonClick.emit(true);
  }
}
