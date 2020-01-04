import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { MobileAuthService } from '../shared/auth/mobile-auth.service';

@Component({
  selector: 'hll-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private mobileAuth: MobileAuthService
  ) { }

  ngOnInit(): void {
    if (this.mobileAuth.isMobileLogin) {
      this.mobileAuth.login();
    }
  }

  authenticate(): void {
    this.auth.login();
  }

}
