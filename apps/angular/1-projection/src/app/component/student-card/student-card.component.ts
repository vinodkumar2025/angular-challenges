import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (onAddButtonClick)="addNewStudent()"
      customClass="bg-light-green">
      <img src="assets/img/student.webp" width="200" height="200" />
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
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);
  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent() {
    this.store.addOne(randStudent());
  }

  onDeleteButtonClick(event: number) {
    this.store.deleteOne(event);
  }
}
