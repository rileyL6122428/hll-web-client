import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { MockComponent } from 'ng-mocks';
import { SiteLogoComponent } from '../shared/site-logo/site-logo.component';
import { TrackPlayerComponent } from '../shared/track-player/track-player.component';
import { AuthService } from '../shared/auth/auth.service';

describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(SiteLogoComponent),
        MockComponent(TrackPlayerComponent),
        ProfileComponent
      ],

      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['logout'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Header', () => {
    it('clicking the log out link tells the auth service to log out', () => {
      const logOutLink = fixture.elementRef.nativeElement.querySelector('#logout') as HTMLElement;
      logOutLink.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const authService = TestBed.get(AuthService);
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
