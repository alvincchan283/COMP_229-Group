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
  };

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('id')) {
        this.id = paraMap.get('id') as string;
        this.recipeService.getRecipeById(this.id).then((recipe) => {
          this.recipe = {
            _id: recipe._id,
            name: recipe.name,
            desc: recipe.desc,
            img: recipe.img,
          };
        });
      }
    });
  }

  onUpdate() {
    this.recipeService.updateRecipe(
      this.recipe._id,
      this.signupForm?.value.recipeName,
      this.signupForm?.value.recipeDesc,
      this.signupForm?.value.img
    );
    this.router.navigate(['/']);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipe._id);
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
