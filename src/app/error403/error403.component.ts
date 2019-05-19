import { Component } from '@angular/core';
import { BaseErrorComponent } from '../shared/error-base/base-error.component';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-error403',
  templateUrl: '../shared/error-base/base-error.component.html',
  styleUrls: ['../shared/error-base/base-error.component.scss']
})
export class Error403Component extends BaseErrorComponent {

  errorCode = 403;

  constructor(
    router: Router,
    auth: AuthService
  ) {
    super(router, auth);
  }

}
