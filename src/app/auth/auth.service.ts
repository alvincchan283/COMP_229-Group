import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { User } from '../user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

interface JwtToken {
  iat: number;
  username: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  private isAuth: boolean = false;
  private authStatus = new BehaviorSubject<boolean>(false);
  private usernameStatus = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const tokenContent: JwtToken = jwtDecode(token);
      this.token = token;
      this.isAuth = true;
      this.authStatus.next(true);
      this.usernameStatus.next(tokenContent.username);
    }
  }

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
        this.httpClient.post<{ token: string }>(`/api/login`, authData)
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
    localStorage.removeItem('token');
    this.token = '';
    this.isAuth = false;
    this.authStatus.next(false);
    this.router.navigate(['/']);
  }

  // Fetch user data method
  getUserData(): Observable<{ username: string; email: string }> {
    // Include the token in the request headers
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });

    return this.httpClient.get<{ username: string; email: string }>(
      '/api/user',
      { headers }
    );
  }

  // Update user data method
  updateUser(user: User): Observable<{ message: string }> {
    // Include the token in the request headers
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });

    return this.httpClient.put<{ message: string }>('/api/user', user, {
      headers,
    });
  }
}
