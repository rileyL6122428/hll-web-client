import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarZoraLinkComponent } from './guitar-zora-link.component';

describe('GuitarZoraLinkComponent', () => {
  let component: GuitarZoraLinkComponent;
  let fixture: ComponentFixture<GuitarZoraLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuitarZoraLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarZoraLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
