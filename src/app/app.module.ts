import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavComponent } from './component/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './auth/login/login.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateRecipeComponent } from './recipe-list/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './recipe-list/edit-recipe/edit-recipe.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TruncatePipe } from './truncate.pipe';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { SearchResultComponent } from './recipe-list/search-result/search-result.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    RecipeListComponent,
    SignupComponent,
    CreateRecipeComponent,
    EditRecipeComponent,
    TruncatePipe,
    RecipeDetailComponent,
    SearchResultComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
