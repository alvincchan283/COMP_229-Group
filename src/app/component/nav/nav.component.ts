import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  auth: boolean = false;
  username: string = '';

  private authStatus: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe((authStatus) => {
        this.auth = authStatus;
        this.authService.getUsernameStatus().subscribe((username) => {
          this.username = username;
        });
      });
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }

  onLogout() {
    this.authService.logOut();
  }
}
