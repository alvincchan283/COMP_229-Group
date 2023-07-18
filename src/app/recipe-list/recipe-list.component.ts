import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe-list.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipeSubscription: Subscription = new Subscription();

  constructor(
    private recipeService: RecipeService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    //Display all recipe from database
    this.recipeService
      .getRecipe()
      .then((data: { message: string; recipes: Recipe[] }) => {
        this.recipes = data.recipes;
      });
    //Update recipe when new recipe is created or deleted
    this.recipeSubscription = this.recipeService
      .getRecipeListener()
      .subscribe((data) => {
        this.recipes = data;
      });
  }

  onDelete(id: string) {
    this.recipeService.deleteRecipe(id);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
