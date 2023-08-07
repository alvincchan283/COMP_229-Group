import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

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
    // Assume you have a method in AuthService to fetch user data
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
        email: this.profileForm?.value.email,
        password: this.profileForm?.value.password,
      };

      // Assume you have a method in AuthService to update user data
      await this.authService.updateUser(updatedUser);
      alert('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  // Navigate to previous page
  goBack() {
    this.router.navigate(['/']); // Replace with the correct route
  }
}
