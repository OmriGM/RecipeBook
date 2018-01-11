import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../shared/recipe.service';
import {ShoppingListService} from '../shared/shoppingList.service';
import {FooterComponent} from "./footer/footer.component";

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
  providers: [ShoppingListService, RecipeService, DataStorageService]
})
export class CoreModule {}
