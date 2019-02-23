import { Injectable } from '@angular/core';
import { Task } from './tasks';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly API = 'http://prova.scytlbrasil.com:81/Api';
  private readonly userid = "07ae89bd848e414ba160afd6330cac";
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** This function returns all tasks of the specified userId. */
  getTasks() {
    let getUrl = `/tasks?userid=${this.userid}`;

    return this.http.get<Task[]>(this.API + getUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** This function get a specific task of the userId or returns an error
   * if the parameters are incorrect. */
  getTask(id: number) {
    let getUrl = `/tasks/GetTask?id=${id}&userid=${this.userid}`;

    return this.http.get<Task>(this.API + getUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** Creates a Task with the DeadLine and Completed params in the correct format. */
  createTask(task: Task) {
    let urlCreate = `/tasks/PostTask?userid=${this.userid}`;
    this.configOutputParams(task);

    return this.http.post(this.API + urlCreate, task, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** Updates a Task with the params in the correct format.*/
  updateTask(task: Task) {
    let urlUpdate = `/tasks/EditTask?id=${task.Id}&userid=${this.userid}`;
    this.configOutputParams(task);

    return this.http.post(this.API + urlUpdate, task, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** Deletes a specific Task of an User */
  deleteTask(task: Task) {
    let urlDelete = `/tasks/RemoveTask?id=${task.Id}&userid=${this.userid}`;

    return this.http.post(this.API + urlDelete,{}, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** Returns an error response if it occurs. */
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError({errorStatus: error.status});
  }

  /** Set the Task params to be in the correct format to perform 
   * the Update and the Create. */
  configOutputParams(task: Task) {
    if (task.Completed != null) {
      task.Completed = Boolean(task.Completed);
    }
    if (task.Deadline != null) {
      task.Deadline = this.setDateFormat(task.Deadline);
    }
  }

  /** Set the Date format to be 'MM/DD/YYYY'. */
  setDateFormat(deadline) {
    let day = `0${deadline.getDate()}`.substr(-2);
    let month =`0${deadline.getMonth() + 1}`.substr(-2);
    let year = deadline.getFullYear();
    return month + "/" + day + "/" + year;
  }

  /** Set the Deadline of a get request to be of the Date type. */
  configInputParams (task: Task) {
    if (task.Deadline != null) {
      task.Deadline = new Date(task.Deadline);
    }
  }

}
