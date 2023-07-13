import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './auth/login/login.component';

import { CreateRecipeComponent } from './recipe-list/create-recipe/create-recipe.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/authguard.guard';
import { EditRecipeComponent } from './recipe-list/edit-recipe/edit-recipe.component';

//Set route
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //canActivate: [AuthGuard] is used to protect the route
  {
    path: 'create-recipe',
    component: CreateRecipeComponent,
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
