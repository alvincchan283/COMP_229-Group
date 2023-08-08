import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './auth/login/login.component';

import { CreateRecipeComponent } from './recipe-list/create-recipe/create-recipe.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/authguard.guard';
import { EditRecipeComponent } from './recipe-list/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { SearchResultComponent } from './recipe-list/search-result/search-result.component';
import { ProfileComponent } from './user/profile/profile.component';

//Set route
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'create-recipe',
    component: CreateRecipeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail-recipe/:id',
    component: RecipeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search-result',
    component: SearchResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
