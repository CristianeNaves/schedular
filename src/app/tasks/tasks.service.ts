import { Injectable } from '@angular/core';
import { Task } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API = '';
  
  private tasks: Task[] = [
    {id: 1, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 2, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 3, title: '', description: '', completed: false, deadline: '08/02/1996'}
  ];

  constructor() { }

  getTasks() {
    return this.tasks;
  }
}
