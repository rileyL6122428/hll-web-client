import { Component } from '@angular/core';
import { ErrorBaseComponent } from '../shared/error-base/error-base.component';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-error403',
  templateUrl: '../shared/error-base/error-base.component.html',
  styleUrls: ['../shared/error-base/error-base.component.scss']
})
export class Error403Component extends ErrorBaseComponent {

  errorCode = 403;

  constructor(
    router: Router,
    auth: AuthService
  ) {
    super(router, auth);
  }

}
