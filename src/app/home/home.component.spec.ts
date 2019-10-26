import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { SiteLogoComponent } from '../shared/site-logo/site-logo.component';
import { AuthService } from '../shared/auth/auth.service';
import { MobileAuthService } from '../shared/auth/mobile-auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mobileAuthMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(SiteLogoComponent),
        HomeComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login'])
        },
        {
          provide: MobileAuthService,
          useValue: jasmine.createSpyObj('MobileAuth', ['login'])
        }
      ]
    })
    .compileComponents();

    mobileAuthMock = TestBed.get(MobileAuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Site Logo', () => {
    it('clicking the site logo tells the auth service to login', () => {
      fixture.detectChanges();
      const siteLogoElement = fixture.elementRef.nativeElement.querySelector('hll-site-logo') as HTMLElement;
      siteLogoElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const authService = TestBed.get(AuthService);
      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe('Mobile auth', () => {
    it('forwards mobile auth logins when mobile auth detected', () => {
      mobileAuthMock.isMobileLogin = true;
      fixture.detectChanges();
      expect(mobileAuthMock.login).toHaveBeenCalled();
    });

    it('does not forward mobile auth login when mobile auth not detected', () => {
      mobileAuthMock.isMobileLogin = false;
      fixture.detectChanges();
      expect(mobileAuthMock.login).not.toHaveBeenCalled();
    });
  });
});
