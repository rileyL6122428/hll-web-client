import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  goToDefaultPage(): void {
    debugger;
    if (this.auth.isAuthenticated) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('/home');
    }
  }

}
