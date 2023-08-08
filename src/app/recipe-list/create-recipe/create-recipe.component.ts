import { Component, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { Router } from '@angular/router';
import { RecipeService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent {
  @ViewChild('f') signupForm: NgForm | undefined;

  constructor(private recipeService: RecipeService, private router: Router) {}

  //Create contact function
  async onCreate() {
    try {
      const recipe: Recipe = {
        _id: '',
        name: this.signupForm?.value.recipeName,
        desc: this.signupForm?.value.recipeDesc,
        img: this.signupForm?.value.img,
        date: new Date(),
        ingredients: this.signupForm?.value.ingredients,
        tips: this.signupForm?.value.tips,
      };
      const response = await lastValueFrom(
        this.recipeService.createRecipe(recipe)
      );

      this.router.navigate(['/']);
      console.log('created:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
}
