import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ShoppingListService } from './shoppingList.service';

import 'rxjs/Rx';
import {Subject} from "rxjs/Subject";

@Injectable()
export class Recipe2Service {
    recipeList: Recipe[] = [];
    recipeListChanged = new Subject();
    constructor(private slService: ShoppingListService,
        public http: Http) { }


     getRecipeList() {
        return this.http.get('http://localhost:3000/recipeslist')
            .map(
            (respone: Response) => {
                const recipes = respone.json().obj;
                let transformedRecipes: Recipe[] = [];
                for (let recipe of recipes) {
                    transformedRecipes.push(new Recipe(recipe._id, recipe.name, recipe.description, recipe.imagePath, recipe.ingredients, recipe.catagory))
                }
                this.recipeList = transformedRecipes;
                this.recipeListChanged.next(this.recipeList.slice());
                return transformedRecipes;
            })
    }

    async isListReady() {
        return new Promise(((resolve, reject) => {
            setTimeout(()=>resolve('test'),1000);
        }));
    }


    getGroupByCatagory() {
        return this.http.get('http://localhost:3000/recipeslist/group')
            .map(
                (respone: Response) => {
                    const groups = respone.json().obj;
                    let counter: number[] = [];
                    let names: string[] = [];
                    for (let g of groups) {
                        counter.push(g.count);
                        names.push(g._id);
                    }
                    return {names: names, counts: counter};
                })
    }

    addRecipe(recipe: Recipe) {
        const body = JSON.stringify(recipe);
        return this.http.post('http://localhost:3000/recipeslist', recipe).map(
            (response: Response) => {
                const result = response.json()
                var index = this.recipeList.indexOf(recipe);
                recipe.recipeId=result.obj._id;
                this.recipeList.push(recipe);
            }
        )
    }

    updateRecipe(recipeId: string, index: number, newRecipe: Recipe) {
        this.recipeList[index] = newRecipe;
        return this.http.patch('http://localhost:3000/recipeslist/' + recipeId, newRecipe);
    }

    deleteRecipe(recipeId: string, index: number) {
        this.recipeList.splice(index, 1);
        return this.http.delete('http://localhost:3000/recipeslist/' + recipeId);

    }


    async getRecipe(index: number) {
            await this.getRecipeList();
            return this.recipeList[index]; // "Slice" is a copy of the array.

    }
    addIngredientsToShoppingList(recipe: Recipe) {
        this.slService.addIngredients(recipe.ingredients);
    }
}