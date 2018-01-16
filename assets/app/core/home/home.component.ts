import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../shared/webSocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  lastRecipeName: string;
  recipeNameSubscription: Subscription;

  constructor(private webSocketService: WebSocketService) { }


  ngOnInit() {
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
