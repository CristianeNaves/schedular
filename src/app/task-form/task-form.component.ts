import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../tasks/tasks';
import { TasksService } from '../tasks/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private task: Task = {Title: null, Description: null, Completed: null, Deadline: null, UserId: "07ae89bd848e414ba160afd6330cac"};
  
  private sub: Subscription;
  private subTask: Subscription;
  private subUpdate: Subscription;
  private subCreate: Subscription;
  private subDel: Subscription;
  
  private showDeleteScreen: boolean = false;
  private loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) { }

  /** Load the requested Task in case of Update and in case of
   * Create, the Task will be the default. */
  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        let id = params["id"];
  
        if (id) {
          this.loading = true;
 
          this.subTask = this.tasksService.getTask(id).subscribe(
          (data) => { this.task = data, 
            this.tasksService.configInputParams(this.task),
            this.loading = false;
          },
          (error) => { 
            this.router.navigate(['']),
            this.loading = false;
          });
        } 
      });
  }
  
  /** Function used to Create or Update a Task */
  onSubmit(form){
    if (this.task.Title) {
      /** Create is done when there's no Id. */
      if (this.task.Id == undefined || this.task.Id == null) {
        this.subCreate = this.tasksService.createTask(this.task).subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
          () => { this.router.navigate(['']) }
          );
      } else {
        this.subCreate = this.tasksService.updateTask(this.task).subscribe(
          (response) => console.log(response),
          (error) => console.log(error),
          () => { this.router.navigate(['']) }
          );
      }
    }
  }
  
  deleteTask() {
    this.subDel = this.tasksService.deleteTask(this.task).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => {this.router.navigate([''])}
    );
  }
      
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe(); 
    if (this.subTask) this.subTask.unsubscribe();
    if (this.subCreate) this.subCreate.unsubscribe();
    if (this.subUpdate) this.subUpdate.unsubscribe();
    if (this.subDel) this.subDel.unsubscribe();
  }
}
    