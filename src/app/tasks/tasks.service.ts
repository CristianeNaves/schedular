import { Injectable } from '@angular/core';
import { Task } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API = '';
  
  private tasks: Task[] = [
    {id: 1, title: 'Schedule n1', description: '', completed: false, deadline: '08/02/1996'},
    {id: 2, title: 'Schedule n2', description: '', completed: false, deadline: '08/02/1996'},
    {id: 3, title: 'Schedule n3', description: '', completed: false, deadline: '08/02/1996'},
    {id: 4, title: 'Schedule n4', description: '', completed: false, deadline: '08/02/1996'},
    {id: 5, title: 'Schedule n5', description: '', completed: false, deadline: '08/02/1996'},
    {id: 6, title: 'Schedule n6', description: '', completed: false, deadline: '08/02/1996'},
    {id: 7, title: 'Schedule n7', description: '', completed: false, deadline: '08/02/1996'},
    {id: 8, title: 'Schedule n8', description: '', completed: false, deadline: '08/02/1996'}
  ];

  constructor() { }

  getTasks() {
    return this.tasks;
  }

  //por enquanto
  getTask(id: number) {   
    for (let i=0; i<this.tasks.length; i++) {
      let task = this.tasks[i];
      if (task.id == id) {
        return task;
      }
    }
    return null;
  }
}
