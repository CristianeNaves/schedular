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
  private readonly getUrl = '/tasks?userid=07ae89bd848e414ba160afd6330cac';
  
  constructor(
    private http: HttpClient
  ) { }

  
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

  getTasks() {
    return this.http.get<Task[]>(this.API + this.getUrl)
      .pipe(
        retry(3),
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

  getTask(id: number) {
    return null;
  }

}
