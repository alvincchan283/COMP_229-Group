import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') profileForm: NgForm | undefined;
  user: any = { username: '', email: '' }; // Define user model as per your requirements

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUserData(); // Fetch user data when component initializes
  }

  // Fetch user data (username and email)
  fetchUserData() {
    this.authService.getUserData().subscribe((data) => {
      this.user = data;
    });
  }

  // Update profile function
  async onUpdate() {
    try {
      // Basic password validation (you can enhance this as needed)
      if (
        this.profileForm?.value.password !==
        this.profileForm?.value.confirmPassword
      ) {
        alert('Passwords do not match.');
        return;
      }

      const updatedUser = {
        username: this.profileForm?.value.username,
        password: this.profileForm?.value.password,
        email: this.profileForm?.value.email,
      };

      const response = await lastValueFrom(
        this.authService.updateUser(updatedUser)
      );
      alert('Profile updated successfully.');
      console.log('updated:', response);
      console.log('updatedUser:', updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  // Navigate to previous page
  goBack() {
    this.router.navigate(['/']); // Replace with the correct route
  }
}
