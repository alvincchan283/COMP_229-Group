import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { User } from '../user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = localStorage.getItem('token') ?? '';
  private isAuth: boolean = localStorage.getItem('token') !== null;
  private authStatus = new Subject<boolean>();
  private usernameStatus = new Subject<string>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  //Make authStatus Observable
  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  //Make usernameStatus Observable
  getUsernameStatus() {
    return this.usernameStatus.asObservable();
  }

  //Get Auth
  getAuth() {
    return this.isAuth;
  }

  getToken() {
    return this.token;
  }
  //Signup function
  signupUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/register', user);
  }

  //Login function
  async login(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    try {
      const res = await firstValueFrom(
        this.httpClient.post<{ token: string }>(`${environment.backend_url}/api/login`, authData)
      );
      const token = res.token;
      this.token = res.token;
      if (token) {
        this.isAuth = true;
        this.authStatus.next(true);
        this.usernameStatus.next(username);
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      }
    } catch (error) {
      let currentUrl = this.router.url;
      await this.router.navigateByUrl('/', { skipLocationChange: true });
      this.router.navigate([currentUrl]);
    }
  }

  //Logout function
  logOut() {
    this.token = '';
    this.isAuth = false;
    this.authStatus.next(false);
    this.router.navigate(['/']);
  }
}
