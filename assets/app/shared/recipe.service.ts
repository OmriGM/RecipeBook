import { Http } from '@angular/http';
import { Recipe } from '../recipes/recipe.model';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shoppingList.service';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from './data-storage.service';
import { Subscription } from 'rxjs/Subscription';
import { isUndefined } from 'util';

@Injectable()
export class RecipeService implements OnInit, OnDestroy {

  initLoad = false;
  recipeChanged = new Subject<Recipe[]>();
  private getDataSub = new Subscription();
  private recipes: Recipe[] = new Array<Recipe>();


  getRecipes() {
    if (!this.initLoad || this.recipes.length === 0) {

      const recipesSubscribeTo = this.dataService.getAllRecipes();
      if (!isUndefined(recipesSubscribeTo)) {
        this.getDataSub = recipesSubscribeTo.subscribe(
          (response) => {
            this.recipes = response;
            this.recipeChanged.next(response);
          },
          (error) => {
            if (error.status === 401) {

              return null;
            }
          }
        );
        this.recipeChanged.next(this.recipes);
        this.initLoad = true;
      }

    }
    return this.recipes.slice(); // "Slice" is a copy of the array.
  }

  getRecipe(index: number) {
    return this.recipes[index]; // "Slice" is a copy of the array.
  }
  addIngredientsToShoppingList(recipe: Recipe) {
    this.slService.addIngredients(recipe.ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.getRecipes());
    return this.dataService.storeAddionalRecipe(recipe);
  }

  updateRecipe(recipeId: string, index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    //this.recipes.splice(this.recipes.indexOf());
    this.recipeChanged.next(this.getRecipes());
  }

  constructor(private slService: ShoppingListService,
    private dataService: DataStorageService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.getDataSub.unsubscribe();
  }

}
