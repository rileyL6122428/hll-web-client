import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { ErrorBaseComponent } from '../shared/error-base/error-base.component';

@Component({
  selector: 'hll-error404',
  templateUrl: '../shared/error-base/error-base.component.html',
  styleUrls: ['../shared/error-base/error-base.component.scss']
})
export class Error404Component extends ErrorBaseComponent {

  errorCode = 404;

  constructor(
    router: Router,
    auth: AuthService
  ) {
    super(router, auth);
  }

}
