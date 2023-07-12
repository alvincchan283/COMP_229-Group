import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './auth/login/login.component';
import { BusinessContactListComponent } from './business-contact-list/business-contact-list.component';
import { CreateContactComponent } from './business-contact-list/create-contact/create-contact.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/authguard.guard';
import { EditContactComponent } from './business-contact-list/edit-contact/edit-contact.component';

//Set route
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //canActivate: [AuthGuard] is used to protect the route
  {
    path: 'create-business-contact',
    component: CreateContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'business-contact-list',
    component: BusinessContactListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-business-contact/:id',
    component: EditContactComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
