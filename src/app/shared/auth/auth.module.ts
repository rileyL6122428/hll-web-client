import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MobileAuthService } from './mobile-auth.service';

@NgModule({
  providers: [
    MobileAuthService,
    AuthService,
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService()
    }
  ]
})
export class AuthModule { }
