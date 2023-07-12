import { Component, ViewChild } from '@angular/core';
import { BusinessContact } from '../businessContact.model';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { BusinessContactService } from '../business-contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent {
  @ViewChild('f') signupForm: NgForm | undefined;

  constructor(
    private businessContactService: BusinessContactService,
    private router: Router
  ) {}

  //Create contact function
  async onCreate() {
    try {
      const businessContact: BusinessContact = {
        _id: '',
        name: this.signupForm?.value.contactName,
        number: this.signupForm?.value.contactNumber,
        email: this.signupForm?.value.email,
      };
      const response = await lastValueFrom(
        this.businessContactService.createBusinessContact(businessContact)
      );
      this.router.navigate(['/business-contact-list']);
      console.log('Contact created:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }
}
