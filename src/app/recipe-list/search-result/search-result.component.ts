import { Component, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe-list.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @ViewChild('f') searchForm: NgForm | undefined;
  searchKeyword: string = '';
  recipes: Recipe[] = [];
  recipeSubscription: Subscription = new Subscription();

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.searchKeyword = this.recipeService.getSearchKeyword();
    this.recipes = this.recipeService.getFetchedRecipes();
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

  onSearch() {
    const keyword = this.searchForm?.value.name;
    if (!keyword) return;

    this.recipeService.searchRecipeByName(keyword).then(() => {
      this.router.navigate(['/search-result']);
    });
  }
}
