import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BusinessContactService } from '../business-contact.service';
import { BusinessContact } from '../businessContact.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm | undefined;
  id: string = '';
  contact: BusinessContact = {
    _id: '',
    name: '',
    number: 0,
    email: '',
  };

  constructor(
    private businessContactService: BusinessContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('id')) {
        this.id = paraMap.get('id') as string;
        this.businessContactService
          .getBusinessContactById(this.id)
          .subscribe((contact) => {
            this.contact = {
              _id: contact._id,
              name: contact.name,
              number: contact.number,
              email: contact.email,
            };
          });
      }
    });
  }

  onUpdate() {
    this.businessContactService.updateContact(
      this.contact._id,
      this.signupForm?.value.contactName,
      this.signupForm?.value.contactNumber,
      this.signupForm?.value.email
    );
    this.router.navigate(['/create-business-contact']);
  }

  onDelete() {
    this.businessContactService.deleteContact(this.contact._id);
    this.router.navigate(['/business-contact-list']);
  }

  onCancel() {
    this.router.navigate(['/business-contact-list']);
  }
}
