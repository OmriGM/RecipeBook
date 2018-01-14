import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  public recipeId:string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public catagory: string;

  constructor(recipeId:string,name: string, desc: string, imagePath: string, ingredients: Ingredient[], catagory: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.catagory = catagory;
  }
}
