import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  providers: [
    AuthService,
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService()
    }
  ]
})
export class AuthModule { }
