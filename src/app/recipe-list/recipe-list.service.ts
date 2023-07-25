import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, firstValueFrom, map } from 'rxjs';
import { Recipe } from './recipe.model';
import { Router } from '@angular/router';

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
        }>('/api/recipe/recipe-list')
      );
      recipeData.recipes.sort((a, b) => a.name.localeCompare(b.name));
      this.recipes = recipeData.recipes;
      return recipeData;
    } catch (error) {
      console.error('Error getting recipes:', error);
      throw error;
    }
  }

  //buiness Recipe list
  getRecipeListener() {
    return this.recipeUpdated.asObservable();
  }

  //create Recipe
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>('/api/recipe/create-list', recipe);
  }

  //Get Recipe
  async getRecipeById(id: string): Promise<{
    _id: string;
    name: string;
    desc: string;
    img: string;
  }> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<{
          _id: string;
          name: string;
          desc: string;
          img: string;
        }>('/api/recipe/recipe-list/' + id)
      );
      return response;
    } catch (error) {
      console.error('Error getting recipe by id:', error);
      throw error;
    }
  }

  //edit Recipe
  async updateRecipe(id: string, name: string, desc: string, img: string) {
    const recipe: Recipe = {
      _id: id,
      name: name,
      desc: desc,
      img: img,
    };
    try {
      await firstValueFrom(
        this.httpClient.put('/api/recipe/recipe-list/' + id, recipe)
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
    this.httpClient.delete('/api/recipe/recipe-list/' + id).subscribe((res) => {
      const updatereceipe = this.recipes.filter((recipes) => recipes._id != id);
      this.recipes = updatereceipe;
      this.recipeUpdated.next([...this.recipes]);
    });
  }
}
