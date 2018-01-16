import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import { Recipe2Service } from '../../shared/recipe2.service';
import { Recipe } from '../recipe.model';
import {Ingredient} from "../../shared/ingredient.model";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {


    id: number;
  recipe: Recipe;
  listSubscription = new Subscription();
  routingSubscription = new Subscription();
  constructor(
    public recipeService2: Recipe2Service,
    private route: ActivatedRoute,
    private router: Router
  )
  {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (this.recipeService2.recipeList.length >=1) {
          this.recipe = this.recipeService2.recipeList[this.id];
        } else {
            this.listSubscription = this.recipeService2.recipeListChanged.subscribe((recipeList: Recipe[]) => {
                this.recipe = recipeList[this.id];
            });
        }

      }
    );
  }

    ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
        this.routingSubscription.unsubscribe();
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
