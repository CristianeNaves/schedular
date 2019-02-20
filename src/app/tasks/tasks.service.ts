import { Injectable } from '@angular/core';
import { Task } from './tasks';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { finalize, tap } from 'rxjs/operators';

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

  getTasks() {
    let getUrl = `/tasks?userid=${this.userid}`;
    return this.http.get<Task[]>(this.API + getUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getTask(id: number) {
    let url = `/tasks/GetTask?id=${id}&userid=${this.userid}`;
    return this.http.get<Task>(this.API + url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  createTask(task: Task) {
    let urlCreate = `/tasks/PostTask?userid=${this.userid}`;

    return this.http.post(this.API + urlCreate, task, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTask(task: Task) {
    let urlUpdate = `/tasks/EditTask?id=${task.Id}&userid=${this.userid}`;

    return this.http.post(this.API + urlUpdate, task, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


}
