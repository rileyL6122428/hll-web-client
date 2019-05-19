import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export abstract class ErrorBaseComponent {

  abstract errorCode: number;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  goToDefaultPage(): void {
    if (this.auth.isAuthenticated) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('/home');
    }
  }

}
