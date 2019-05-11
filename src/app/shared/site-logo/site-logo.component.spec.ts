import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLogoComponent } from './site-logo.component';
import { MockComponent } from 'ng-mocks';
import { OcarinaLinkComponent } from '../images/ocarina-link/ocarina-link.component';

describe('SiteLogoComponent', () => {
  let component: SiteLogoComponent;
  let fixture: ComponentFixture<SiteLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteLogoComponent,
        MockComponent(OcarinaLinkComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
