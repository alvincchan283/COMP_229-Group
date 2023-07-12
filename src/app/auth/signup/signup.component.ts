import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../user.model';
import { AuthService } from '../auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @ViewChild('f') signupForm: NgForm | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  //Signup function
  async onSignUp() {
    try {
      const user: User = {
        username: this.signupForm?.value.username,
        password: this.signupForm?.value.password,
        email: this.signupForm?.value.email,
      };
      const response = await lastValueFrom(this.authService.signupUser(user));
      this.router.navigate(['/login']);
      console.log('Data posted:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
}
