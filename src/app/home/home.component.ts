import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../todo/todo.model';
import { CommonService } from '../shared/common.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app.constants';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ti-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private todoList$: Observable<Todo[]>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.todoList$ = this.commonService.getCall('todos');
  }
  doLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  todoAdded(event) {
    this.commonService.postCall('todo', event).subscribe(
      (todo: Todo) => {
        this.toastService.showToast('Successfully saved Todo', 5);
      },
      error => {
        this.toastService.showToast(
          'There was an error occured while saving todo. Please try again after some time',
          5
        );
      }
    );
  }
}
