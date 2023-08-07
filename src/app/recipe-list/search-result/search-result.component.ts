import { Component } from '@angular/core';
import { RecipeService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  recipes: Recipe[] = [];
  recipeSubscription: Subscription = new Subscription();

  constructor (private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getFetchedRecipes();
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
