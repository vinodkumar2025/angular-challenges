import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      (onAddButtonClick)="addNewCity()"
      customClass="bg-light-green">
      <img src="assets/img/city.png" width="200" height="200" />
      <ng-template #listView let-item>
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (onDeleteClick)="onDeleteButtonClick($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);
  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addNewCity() {
    this.store.addOne(randomCity());
  }

  onDeleteButtonClick(event: number) {
    this.store.deleteOne(event);
  }
}
