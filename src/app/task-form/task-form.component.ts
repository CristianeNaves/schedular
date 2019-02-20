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
  private showDeleteScreen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) => {
        // o que acontece se passar um id inexistente
        let id = params["id"];
        if (id) {
          this.subTask = this.tasksService.getTask(id).subscribe(
            data => this.task = data
          );
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); 
    this.subTask.unsubscribe();
  }

  onSubmit(form){
    //arrumar o completed e o deadline
    if (this.task.Title) {
      if (this.task.Id == undefined || this.task.Id == null) {
        this.tasksService.createTask(this.task).subscribe(
          (val) => { console.log(val) },
          (error) => { console.log(error) }
        );
      } else {
        this.tasksService.updateTask(this.task).subscribe(
          (val) => { console.log(val) },
          (error) => { console.log(error) }
        );
      }
    }
    this.router.navigate(['']);
  }

  deleteTask() {
    this.tasksService.deleteTask(this.task).subscribe(
      (val) => { console.log(val) },
      (error) => { console.log(error) }
    );
    this.router.navigate(['']);  //nao vai estar atualizado
  }

}
