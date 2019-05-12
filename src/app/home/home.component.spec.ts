import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { SiteLogoComponent } from '../shared/site-logo/site-logo.component';
import { AuthService } from '../shared/auth/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Site Logo', () => {
    it('clicking the site logo tells the auth service to login', () => {
      const siteLogoElement = fixture.elementRef.nativeElement.querySelector('hll-site-logo') as HTMLElement;
      siteLogoElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const authService = TestBed.get(AuthService);
      expect(authService.login).toHaveBeenCalled();
    });
  });
});
