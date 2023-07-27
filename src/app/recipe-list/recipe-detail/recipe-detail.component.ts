import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RecipeService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
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

  convertDate: string = '';

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
            date: new Date(recipe.date),
            ingredients: recipe.ingredients,
            tips: recipe.tips,
          };
        });
      }
    });
  }
}
