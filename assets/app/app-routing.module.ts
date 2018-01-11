import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {HomeComponent} from './core/home/home.component';
import { StoresComponent } from './stores/stores.component';
import {StatsComponent} from './statistics/stats.component';



const appRoutse: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'stores', component: StoresComponent},
  {path: 'stats', component: StatsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutse, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
