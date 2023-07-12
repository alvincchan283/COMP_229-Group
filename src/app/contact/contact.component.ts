import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  @ViewChild('f') signupForm: NgForm | undefined;
  userEmail = '';

  constructor(private router: Router) {}
  //Print all data inputted by the user
  onSubmit(form: NgForm): void {
    console.log(this.signupForm?.value);
    form.resetForm();
    this.router.navigate(['']);
  }
}
