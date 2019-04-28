import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcarinaLinkComponent } from './ocarina-link.component';

describe('OcarinaLinkComponent', () => {
  let component: OcarinaLinkComponent;
  let fixture: ComponentFixture<OcarinaLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcarinaLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcarinaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
