import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  constructor(public recipeId:string, public name: string, public desc: string, public imagePath: string, public ingredients: Ingredient[], public catagory: string) {}
}
