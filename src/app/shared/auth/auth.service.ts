import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '8s0svZVEfS2xCNw82ivgGr3YFU4OQx7n',
    domain: 'dev-kfaat8-8.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/assets/oauth/redirection-handler.html',
    scope: 'openid profile'
  });

  constructor(
    public router: Router,
    private jwtDecoder: JwtHelperService
  ) {
    this.idToken = this.idToken || '';
    this.accessToken = this.accessToken || '';
    this.expiresAt = this.expiresAt || 0;
  }

  public login(): void {
    this.auth0.authorize();
  }

  private localLogin(authResult): void {
    // Set the time that the access token will expire at
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this.expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    this.accessToken = '';
    this.idToken = '';
    this.expiresAt = 0;
    this.auth0.logout({
      returnTo: 'http://localhost:4200/#/home'
    });
  }

  get isAuthenticated(): boolean {
    return this.accessToken && Date.now() < this.expiresAt;
  }

  get accessToken(): string {
    return sessionStorage.getItem('access_token');
  }

  set accessToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  get idToken(): string {
    return sessionStorage.getItem('id_token');
  }

  set idToken(token: string) {
    sessionStorage.setItem('id_token', token);
  }

  private get expiresAt(): number {
    return Number(sessionStorage.getItem('expires_at'));
  }

  private set expiresAt(time: number) {
    sessionStorage.setItem('expires_at', time.toString());
  }

  get userID(): string {
    return this.jwtDecoder.decodeToken(this.idToken).name;
  }
}
