import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../../shared/recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  constructor(private rcipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.rcipeService.getRecipe(this.id);
      }
    );
  }

  onAddToSL(recipe: Recipe) {
    this.rcipeService.addIngredientsToShoppingList(recipe);
  }

  onEditClick() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.rcipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
