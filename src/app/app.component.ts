import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'k3s-dashboard';
  shouldIncrease = false;
  increase(){
      this.shouldIncrease = true;
      let counter = 0;
      while(this.shouldIncrease) {
        counter = counter * counter + 2500;
      }
  }

  stop(){
    this.shouldIncrease = false;
  }
}
