import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class K8sService {
  pods = [];
  amountOfPods: number[] = [];
  timeArray: String[] = [];
  time: BehaviorSubject<any> = new BehaviorSubject<any>({});
  podsBehaviour: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) { }

  getPods() {

    interval(3000).subscribe(x => {
      this.http.get<any>('http://localhost:30081/pods').subscribe(pods => {
        console.log(pods);

        this.pods = pods.items;
        this.podsBehaviour.next(this.pods);
        this.amountOfPods.push(this.pods.length);
        this.timeArray.push(new Date().toLocaleTimeString('de-DE'));
        this.time.next({ time: this.timeArray, pods: this.amountOfPods
        })
      });
    });
  }
}
