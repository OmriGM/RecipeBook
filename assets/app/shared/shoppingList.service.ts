import {Injectable, OnInit} from '@angular/core';
import {Ingredient} from './ingredient.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ShoppingListService implements OnInit {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = new Array<Ingredient>(); //TODO change to hashmap. and make amount updateable when adding same name item.
  //   [
  //   new Ingredient('Apple', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  ngOnInit() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addNewIngredientToArray(ingredient: Ingredient) {
    this.ingredients['test'] = new Ingredient('test', 2);

    this.ingredients.push(ingredient);
    // this.ingredients[ingredient.name].push(ingredient);
    this.ingredientChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
          ingredients.forEach(item => {this.addNewIngredientToArray(item); } );

          //another way to push is
    //this.ingredients.push(...ingredients);
    //this.ingredientChangedEvent.emit(this.getIngredients());


          // for (let ingredient of ingredients) {
          //   this.addNewIngredientToArray(ingredient);
          // }
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.getIngredients());
  }
}
