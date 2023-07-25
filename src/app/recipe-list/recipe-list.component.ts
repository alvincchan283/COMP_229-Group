import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe-list.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipeSubscription: Subscription = new Subscription();
  authStatus: Subscription = new Subscription();
  auth: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
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
    this.auth = this.authService.getAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe((authStatus) => {
        this.auth = authStatus;
      });
  }

  onDelete(id: string) {
    this.recipeService.deleteRecipe(id);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.authStatus.unsubscribe();
  }
}
