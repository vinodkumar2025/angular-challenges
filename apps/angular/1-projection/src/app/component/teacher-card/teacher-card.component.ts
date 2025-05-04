import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (onAddButtonClick)="addNewTeacher()"
      [customClass]="'bg-light-green'">
      <img src="assets/img/teacher.png" width="200" height="200" />
      <ng-template #listView let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (onDeleteClick)="onDeleteButtonClick($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 255, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewTeacher() {
    this.store.addOne(randTeacher());
  }

  onDeleteButtonClick(event: number) {
    this.store.deleteOne(event);
  }
}
