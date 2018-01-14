import { Component, OnInit } from '@angular/core';
import {Recipe2Service} from "../shared/recipe2.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(public recipeService: Recipe2Service) { }

  ngOnInit() {
  }



}
