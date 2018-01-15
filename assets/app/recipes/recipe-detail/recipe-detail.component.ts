import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import { RecipeService } from '../../shared/recipe.service';
import { Recipe2Service } from '../../shared/recipe2.service';
import { Recipe } from '../recipe.model';
import {Ingredient} from "../../shared/ingredient.model";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  constructor(private rcipeService: RecipeService,
    private recipeService2: Recipe2Service,
    private route: ActivatedRoute,
    private router: Router
  )
  {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService2.getRecipe(this.id);
      }
    );
  }

  onAddToSL(recipe: Recipe) {
    this.recipeService2.addIngredientsToShoppingList(recipe);
  }

  onEditClick() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    const recipeID=this.recipeService2.recipeList[this.id].name;
    this.recipeService2.deleteRecipe(recipeID,this.id).subscribe();
    //this.router.navigate(['../'], { relativeTo: this.route });
    this.router.navigate(['/recipes']);
  }

}
