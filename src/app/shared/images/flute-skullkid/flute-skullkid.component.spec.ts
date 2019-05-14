import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluteSkullkidComponent } from './flute-skullkid.component';

describe('FluteSkullkidComponent', () => {
  let component: FluteSkullkidComponent;
  let fixture: ComponentFixture<FluteSkullkidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluteSkullkidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluteSkullkidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
