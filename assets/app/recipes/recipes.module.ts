import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RecipesComponent} from './recipes.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FilterPipe} from "./recipe-list/filter.pipe";
import {CheckFilterPipe} from "./recipe-list/check-filter.pipe";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    FilterPipe,
    CheckFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class RecipesModule {

}
