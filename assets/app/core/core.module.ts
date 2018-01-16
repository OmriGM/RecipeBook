import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {DataStorageService} from '../shared/data-storage.service';
import {ShoppingListService} from '../shared/shoppingList.service';
import {FooterComponent} from "./footer/footer.component";
import { Recipe2Service } from '../shared/recipe2.service';
import { WebSocketService } from '../shared/webSocket.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [ShoppingListService, DataStorageService,Recipe2Service,WebSocketService]
})
export class CoreModule {}
