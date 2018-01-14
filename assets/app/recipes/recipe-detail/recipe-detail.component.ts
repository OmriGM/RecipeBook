import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import { RecipeService } from '../../shared/recipe.service';
import { Recipe2Service } from '../../shared/recipe2.service';
import { Recipe } from '../recipe.model';


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
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });
  }

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
    this.router.navigate(['recipes']);
  }

}
