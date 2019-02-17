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
    {id: 3, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 4, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 5, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 6, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 7, title: '', description: '', completed: false, deadline: '08/02/1996'},
    {id: 8, title: '', description: '', completed: false, deadline: '08/02/1996'}
  ];

  constructor() { }

  getTasks() {
    return this.tasks;
  }
}
