import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { BaseErrorComponent } from '../shared/error-base/base-error.component';

@Component({
  selector: 'hll-error404',
  templateUrl: '../shared/error-base/base-error.component.html',
  styleUrls: ['../shared/error-base/base-error.component.scss']
})
export class Error404Component extends BaseErrorComponent {

  errorCode = 404;

  constructor(
    router: Router,
    auth: AuthService
  ) {
    super(router, auth);
  }

}
