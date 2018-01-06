import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {Http} from '@angular/http';
import {AuthService} from '../auth/auth.service';
import {isUndefined} from 'util';
import 'rxjs/add/operator/map';




@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private authService: AuthService) { }

  storeAddionalRecipe(recipe: Recipe) {
    //this.http.post('https://udemy-ng-http-e8223.firebaseio.com/recipes.json', recipe);
  }

  // getAllRecipes() {
  //   const token = this.authService.getToken();
  //   let recipes = [];
  //   this.http.get('https://udemy-ng-http-e8223.firebaseio.com/recipes.json?auth=' + token, ).map(
  //     (response) => {
  //       const data = response.json();
  //       const recipesArr = [];
  //       for (const r in data) {
  //         recipesArr.push(data[r]);
  //       }
  //       return recipesArr;
  //     },
  //     (error) => console.log(error)
  //   ).subscribe(
  //     (response) => {
  //       for (const r of response) {
  //         recipes.push(r);
  //       }
  //     },
  //     (error) => console.log(error)
  //   );
  //   return recipes;
  // }

  getAllRecipes() {
    // const token = this.authService.getToken();
    // let recipes;
    // if (!isUndefined(token)) {

    // recipes = this.http.get('https://udemy-ng-http-e8223.firebaseio.com/recipes.json?auth=' + token, ).map(
    //   (response) => {
    //     const data = response.json();
    //     const recipesArr = [];
    //     for (const r in data) {
    //       recipesArr.push(data[r]);
    //     }
    //     return recipesArr;
    //   });
    // }
    // return recipes;
  }

}
