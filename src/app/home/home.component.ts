import { Component, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe-list/recipe-list.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('f') searchForm: NgForm | undefined;

  constructor(private recipeService: RecipeService, private router: Router) {}

  onSearch() {
    const keyword = this.searchForm?.value.name;
    if (!keyword) return;

    this.recipeService.searchRecipeByName(keyword).then(() => {
      this.router.navigate(['/search-result']);
    });
  }
}
