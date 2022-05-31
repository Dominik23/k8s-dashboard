import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval } from 'rxjs';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ChartBottomsheetComponent } from './chart-bottomsheet/chart-bottomsheet.component';
import { K8sService } from './services/k8s.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent {
  pods:any[] = [];
  clicked = false;
  timeArray: string[] = [];
  amountOfPods: number[] = [];
  decreasing = false;
  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private bottomsheet: MatBottomSheet, public k8sService: K8sService) {
    k8sService.getPods();

    this.k8sService.podsBehaviour.subscribe(pods => {
      console.log(pods);
      this.pods = pods;
    })
  }

  createLoad() {
    this.clicked = true;
    for (let i = 0; i < 40; i++) {
      this.http.get<any>('http://localhost:30088/start').subscribe(result => {
        if (i == 39) {
          this.clicked = false;
        }
      }, error => {
        if (i == 39) {
          this.clicked = false;
        }
      });
    }
    this._snackBar.open("Auslastung gestartet", "OK");
  }

  

  openBottomsheet() {
    this.bottomsheet.open(ChartBottomsheetComponent);
  }

}
