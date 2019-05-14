import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private auth: AuthService
  ) { }

  authenticate(): void {
    this.auth.login();
  }

}
