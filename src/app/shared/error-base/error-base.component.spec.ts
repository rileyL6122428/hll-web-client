import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBaseComponent } from './error-base.component';

describe('ErrorBaseComponent', () => {
  let component: ErrorBaseComponent;
  let fixture: ComponentFixture<ErrorBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
