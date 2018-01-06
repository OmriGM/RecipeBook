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
      // firebase.initializeApp({
      //   apiKey: "AIzaSyCStlRS92cORB0LiLKhSDo1fazaJJcrs2U",
      //   authDomain: "udemy-ng-http-e8223.firebaseapp.com"
      // });
  }
}
