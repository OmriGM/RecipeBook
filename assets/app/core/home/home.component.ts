import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../shared/webSocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
<<<<<<< HEAD
export class HomeComponent implements OnInit, OnDestroy {
  lastRecipeName: string;
  recipeNameSubscription: Subscription;

  constructor(private webSocketService: WebSocketService) { }
=======
export class HomeComponent implements OnInit {
  socket: WebSocket;
  constructor() { }
>>>>>>> e8f1eb2db838eb1a6090968b441b96b5ee11a26d

  ngOnInit() {
    //socket.io subscribe to a message received from server:
    this.lastRecipeName = this.webSocketService.lastRecipe;
    this.recipeNameSubscription = this.webSocketService.lastRecipeName.subscribe((msg) => {
      this.lastRecipeName = msg;
    });
    this.webSocketService.getMessage().subscribe(msg => {
    });

  }

  ngOnDestroy() {
    this.recipeNameSubscription.unsubscribe();
  }
}
