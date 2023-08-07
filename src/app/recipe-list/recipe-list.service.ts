import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, firstValueFrom, map } from 'rxjs';
import { Recipe } from './recipe.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];

  private recipeUpdated = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  async getRecipe(): Promise<{
    message: string;
    recipes: Recipe[];
  }> {
    try {
      const recipeData = await firstValueFrom(
        this.httpClient.get<{
          message: string;
          recipes: Recipe[];
        }>(`/api/recipe/recipe-list`)
      );
      recipeData.recipes.sort((a, b) => a.name.localeCompare(b.name));
      this.recipes = recipeData.recipes;
      return recipeData;
    } catch (error) {
      console.error('Error getting recipes:', error);
      throw error;
    }
  }

  //Get the recipes stored in service.
  getFetchedRecipes() {
    return this.recipes;
  }

  //buiness Recipe list
  getRecipeListener() {
    return this.recipeUpdated.asObservable();
  }

  //create Recipe
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(`/api/recipe/create-list`, recipe);
  }

  //Get Recipe
  async getRecipeById(id: string): Promise<Recipe> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<Recipe>(`/api/recipe/recipe-list/` + id)
      );
      return response;
    } catch (error) {
      console.error('Error getting recipe by id:', error);
      throw error;
    }
  }

  // Search recipe by keyword.
  async searchRecipeByName(name: string): Promise<Recipe[]> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<Recipe[]>(`/api/recipe/search?name=${name}`)
      );
      this.recipes = response;
      return response;
    } catch (error) {
      console.error('Error searching recipe by name: ', error);
      throw error;
    }
  }

  //edit Recipe
  async updateRecipe(
    id: string,
    name: string,
    desc: string,
    img: string,
    date: Date,
    ingredients: string,
    tips: string
  ) {
    const recipe: Recipe = {
      _id: id, name, desc, img, date, ingredients, tips
    };
    try {
      await firstValueFrom(
        this.httpClient.put(`/api/recipe/recipe-list/${id}`, recipe)
      );
      await this.getRecipe();
      this.recipeUpdated.next(this.recipes);
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }

  //delete Recipe
  deleteRecipe(id: string) {
    this.httpClient.delete(`/api/recipe/recipe-list/${id}` + id).subscribe((res) => {
      const updatereceipe = this.recipes.filter((recipes) => recipes._id != id);
      this.recipes = updatereceipe;
      this.recipeUpdated.next([...this.recipes]);
    });
  }
}
