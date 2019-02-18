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
  private error: any;
  private sub: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.sub = this.tasksService.getTasks().subscribe(
      (data: Task[]) => { this.tasks = data },
      error => this.error = error
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
