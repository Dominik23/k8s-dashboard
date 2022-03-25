import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            transition(':enter', [
              animate(600, style({opacity: 1}))
            ]),
          ]
        ),
        transition(
          ':leave', 
          [
            animate(600, style({opacity: 0}))
          ]
        )
      ]
    )
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
    for (let i = 0; i < 50; i++) {
      this.http.get('http://localhost:30081/test').subscribe(result => {
        if (i == 49) {
          this.clicked = false;
        }
      }, error => {
        if (i == 49) {
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
