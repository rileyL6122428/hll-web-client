import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { Router } from '@angular/router';
import { MaskSalesmanComponent } from '../images/mask-salesman/mask-salesman.component';
import { AuthService } from '../auth/auth.service';
import { Type } from '@angular/core';

export const errorBaseComponentSpecs = <T>(ComponentClass: Type<T>, otherProviders = []) => {

  describe(`ErrorBase:${ComponentClass.name}`, () => {

    let component: T;
    let fixture: ComponentFixture<T>;
    let router: any;
    let authService: any;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ComponentClass,
          MockComponent(MaskSalesmanComponent)
        ],
        providers: [
          {
            provide: Router,
            useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
          },
          {
            provide: AuthService,
            useValue: {}
          },
          ...otherProviders
        ]
      })
        .compileComponents();

      router = TestBed.get(Router);
      authService = TestBed.get(AuthService);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ComponentClass);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Mask Salesman click', () => {

      let maskSalesmanElement: HTMLElement;

      beforeEach(() => {
        maskSalesmanElement = fixture.debugElement.nativeElement.querySelector('hll-mask-salesman') as HTMLElement;
      });

      it('redirects to profile page when authenticated', () => {
        authService.isAuthenticated = true;
        maskSalesmanElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/profile');
      });

      it('redirects to home page when not authenticated', () => {
        authService.isAuthenticated = false;
        maskSalesmanElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
      });
    });
  });
};

