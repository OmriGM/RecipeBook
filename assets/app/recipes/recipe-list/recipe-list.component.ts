import {Component, OnDestroy, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../../shared/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Recipe2Service } from '../../shared/recipe2.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


    subscription: Subscription;
  searchFilter = '';
  recipes: Recipe[];
  constructor(private recipeService: RecipeService,
    private recipeService2: Recipe2Service,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.recipeService2.getRecipeList().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  onNewRecipeClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
