import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class AppComponent {
  pods = [];
  clicked = false;
  decreasing = false;
  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {
    this.getPods();
  }

  createLoad() {
    this.clicked = true;
    for (let i = 0; i < 90; i++) {
      this.http.get<any>('http://localhost:30084/start').subscribe(result => {
        if (i == 89) {
          this.clicked = false;
        }
      }, error => {
        if (i == 89) {
          this.clicked = false;
        }
      });
    }
    this._snackBar.open("Auslastung gestartet", "OK");
  }

  getPods() {
    interval(2000).subscribe(x => {
      this.http.get<any>('http://localhost:30081/pods').subscribe(pods => {
        console.log(pods);
        this.pods = pods.items;
      });
    });
  }

}
