import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schedular';
  private toggler: boolean = false;

  /** This function checks if the actual url is the Main Screen to
   *  decide what option will be used in the navbar*/
  isMainScreen(){
    let url = window.location.pathname;
    return (url == '' || url == '/');
  }

}
