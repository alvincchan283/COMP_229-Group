import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContactListComponent } from './business-contact-list.component';

describe('BusinessContactListComponent', () => {
  let component: BusinessContactListComponent;
  let fixture: ComponentFixture<BusinessContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessContactListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
