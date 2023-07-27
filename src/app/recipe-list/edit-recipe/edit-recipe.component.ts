import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe-list.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm | undefined;
  id: string = '';
  recipe: Recipe = {
    _id: '',
    name: '',
    desc: '',
    img: '',
    date: new Date(),
    ingredients: '',
    tips: '',
  };

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //Get recipe id from url
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('id')) {
        this.id = paraMap.get('id') as string;
        this.recipeService.getRecipeById(this.id).then((recipe) => {
          this.recipe = {
            _id: recipe._id,
            name: recipe.name,
            desc: recipe.desc,
            img: recipe.img,
            date: new Date(recipe.date),
            ingredients: recipe.ingredients,
            tips: recipe.tips,
          };
        });
      }
    });
  }

  //Update recipe function
  onUpdate() {
    this.recipeService.updateRecipe(
      this.recipe._id,
      this.signupForm?.value.recipeName,
      this.signupForm?.value.recipeDesc,
      this.signupForm?.value.img,
      new Date(),
      this.signupForm?.value.ingredients,
      this.signupForm?.value.tips
    );
    this.router.navigate(['/']);
    console.log(this.signupForm?.value.ingredients);
    console.log(this.signupForm?.value.tips);
  }

  //Delete recipe function
  onDelete() {
    this.recipeService.deleteRecipe(this.recipe._id);
    this.router.navigate(['/']);
  }

  //Cancel function
  onCancel() {
    this.router.navigate(['/']);
  }
}
