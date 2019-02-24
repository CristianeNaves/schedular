import { Component, OnInit } from '@angular/core';
import { Task } from './tasks';
import { TasksService } from './tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private tasks: Task[];
  private sub: Subscription;
  private loading: boolean = false;

  constructor(private tasksService: TasksService) { }

  /** Gets the tasks to display it in the Main Screen */
  ngOnInit() {
    this.loading = true; 
    this.sub = this.tasksService.getTasks().subscribe(
      (data: Task[]) => { 
        this.tasks = data;
        this.loading = false;
      },
      error => { 
        console.log(error);
        this.tasks = [];
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
