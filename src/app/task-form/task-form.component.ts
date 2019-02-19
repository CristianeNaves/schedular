import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../tasks/tasks';
import { TasksService } from '../tasks/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private task: Task;
  private sub: Subscription;
  private subTask: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        let id = params["id"];
        this.subTask = this.tasksService.getTask(id).subscribe(
          data => { this.task = data
            console.log(this.task)
          }

        );
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); 
    this.subTask.unsubscribe();
  }

  onSubmit(form){
    console.log(form);
  }

}
