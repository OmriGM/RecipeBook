import { Recipe2Service } from '../../shared/recipe2.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../shared/recipe.service';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {


    id: number;
  editMode = false;
  recipeForm: FormGroup;
  routeSubscription = new Subscription();

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeService2: Recipe2Service,
    private router: Router) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }
    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
  }

  initForm() {
    let recipeName = '';
    let recipeCatagory = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService2.getRecipe(this.id);
      recipeName = recipe.name;
      recipeCatagory=recipe.catagory;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.desc;
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'catagory': new FormControl(recipeCatagory, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  onSubmit() {
    if (this.editMode) {
      const recipeID=this.recipeService2.recipeList[this.id].name;
      this.recipeService2.updateRecipe(recipeID,this.id, this.recipeForm.value).subscribe();
    } else {
      this.recipeService2.addRecipe(this.recipeForm.value).subscribe();
    }
    this.resetEdit()
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    if ((<FormArray>this.recipeForm.get('ingredients')).length !== 1) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
  }

  onDeleteRecipe() {
    //const recipeID=this.recipeService2.recipeList[this.id].name;
    //this.recipeService2.deleteRecipe(recipeID,this.id).subscribe();
    this.resetEdit();
  }

  resetEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.recipeForm.reset();
  }
}
