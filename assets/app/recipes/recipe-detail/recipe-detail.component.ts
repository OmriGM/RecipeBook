import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import { RecipeService } from '../../shared/recipe.service';
import { Recipe2Service } from '../../shared/recipe2.service';
import { Recipe } from '../recipe.model';
import {Ingredient} from "../../shared/ingredient.model";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  listSubscription = new Subscription();
  constructor(private rcipeService: RecipeService,
    public recipeService2: Recipe2Service,
    private route: ActivatedRoute,
    private router: Router
  )
  {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.listSubscription = this.recipeService2.recipeListChanged.subscribe((recipeList: Recipe[]) => {
            this.recipe = recipeList[this.id];
        });
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
    this.router.navigate(['/recipes']);
  }

}
