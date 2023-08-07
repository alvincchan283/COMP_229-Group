import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  auth: boolean = false;
  username: string = '';

  private authStatus: Subscription = new Subscription();
  private usernameStatus: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //Check login status
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(authStatus => this.auth = authStatus);
    this.usernameStatus = this.authService
      .getUsernameStatus()
      .subscribe(username => this.username = username);
  }

  //Unsubscribe
  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
    this.usernameStatus.unsubscribe();
  }

  //Logout function
  onLogout() {
    this.authService.logOut();
  }
}
