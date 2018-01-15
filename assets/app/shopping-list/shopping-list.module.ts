
import {NgModule} from '@angular/core';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ShoppingListComponent} from './shopping-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from "./filter.pipe";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ShoppingListModule {}
