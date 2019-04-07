import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'ti-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() list: Todo[];
  @Output() added = new EventEmitter<Todo>();
  public todoName = null;
  constructor() {}

  ngOnInit() {}
  addTodo(event) {
    const todo: Todo = { name: this.todoName, completed: false };
    this.added.emit(todo);
    this.list.unshift(todo);
  }
  clearInput(event) {
    console.log(event);
    this.todoName = '';
  }
}
