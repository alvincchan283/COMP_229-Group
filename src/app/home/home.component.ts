import { Component, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe-list/recipe-list.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('f') searchForm: NgForm | undefined;

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  onSearch() {
    const keyword = this.searchForm?.value.name;
    if (!keyword) return;

    this.recipeService.searchRecipeByName(keyword).then(() => {
      this.router.navigate(['/search-result']);
    });
  }

  navigate() {
    // Check if the user is authenticated
    if (this.authService.getAuth()) {
      // If authenticated, navigate to the /createpost route
      // TODO: check if link works
      this.router.navigate(['/create-recipe']);
    } else {
      // If not authenticated, navigate to the /login route
      this.router.navigate(['/login']);
    }
  }
}
