import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schedular';
  private toggler: boolean = false;

  constructor () { }

  getUrl() {
    return window.location.pathname;
  }
  //pegar rota da pagina

}
