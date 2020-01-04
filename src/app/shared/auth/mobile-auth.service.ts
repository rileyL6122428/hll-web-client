import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';

@Injectable()
export class MobileAuthService {

  auth0 = new auth0.WebAuth({
    clientID: '8s0svZVEfS2xCNw82ivgGr3YFU4OQx7n',
    domain: 'dev-kfaat8-8.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'mycoolapp://callback',
    scope: 'openid profile'
  });

  constructor(
    public router: Router
  ) { }

  public login(): void {
    this.auth0.authorize();
  }

  public get isMobileLogin(): boolean {
    return this.router.routerState.snapshot.url.indexOf('mobile-login') !== -1;
  }
}
