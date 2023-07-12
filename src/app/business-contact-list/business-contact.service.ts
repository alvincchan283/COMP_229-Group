import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { BusinessContact } from './businessContact.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BusinessContactService {
  businessContact: BusinessContact[] = [];
  //mainly for delete fuction
  private contactUpdated = new Subject<BusinessContact[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  //buiness contact list
  getBusinessContact(): Observable<{
    message: string;
    businessContact: BusinessContact[];
  }> {
    return (
      this.httpClient
        .get<{
          message: string;
          businessContact: BusinessContact[];
        }>('/api/business/contact-list')
        //change data to sorted list
        .pipe(
          map(
            (contactData: {
              message: string;
              businessContact: BusinessContact[];
            }) => {
              contactData.businessContact.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
              this.businessContact = contactData.businessContact;
              return contactData;
            }
          )
        )
    );
  }

  //buiness contact list
  getContactListener() {
    return this.contactUpdated.asObservable();
  }

  //create contact
  createBusinessContact(
    businessContact: BusinessContact
  ): Observable<BusinessContact> {
    return this.httpClient.post<BusinessContact>(
      '/api/business/create-list',
      businessContact
    );
  }

  //edit contact
  getBusinessContactById(id: string): Observable<{
    email: string;
    number: number;
    name: string;
    _id: string;
  }> {
    return this.httpClient.get<{
      email: string;
      number: number;
      name: string;
      _id: string;
    }>('/api/business/contact-list/' + id);
  }

  //edit contact
  updateContact(id: string, name: string, number: number, email: string) {
    const businessContact: BusinessContact = {
      _id: id,
      email: email,
      number: number,
      name: name,
    };
    this.httpClient
      .put('/api/business/contact-list/' + id, businessContact)
      .subscribe((res) => {
        this.router.navigate(['/business-contact-list']);
      });
  }

  //buiness contact list
  deleteContact(id: string) {
    this.httpClient
      .delete('/api/business/contact-list/' + id)
      .subscribe((res) => {
        const updateContact = this.businessContact.filter(
          (contact) => contact._id != id
        );
        this.businessContact = updateContact;
        this.contactUpdated.next([...this.businessContact]);
      });
  }
}
