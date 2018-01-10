import {Component, OnInit} from '@angular/core';
// import * as firebase from 'firebase';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loadedFeature = 'recipe';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }


  ngOnInit(): void {

  }
}
