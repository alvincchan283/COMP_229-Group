import { Component, OnInit } from '@angular/core';
import { BusinessContact } from './businessContact.model';
import { HttpClient } from '@angular/common/http';
import { BusinessContactService } from './business-contact.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-business-contact-list',
  templateUrl: './business-contact-list.component.html',
  styleUrls: ['./business-contact-list.component.css'],
})
export class BusinessContactListComponent implements OnInit {
  businessContact: BusinessContact[] = [];
  contactSubscription: Subscription = new Subscription();

  constructor(
    private businessContactService: BusinessContactService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    //Display all contacts from database
    this.businessContactService.getBusinessContact().subscribe((data) => {
      this.businessContact = data.businessContact;
    });
    //Update contact list when new contact is created or deleted
    this.contactSubscription = this.businessContactService
      .getContactListener()
      .subscribe((data) => {
        this.businessContact = data;
      });
  }

  onDelete(id: string) {
    this.businessContactService.deleteContact(id);
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }
}
