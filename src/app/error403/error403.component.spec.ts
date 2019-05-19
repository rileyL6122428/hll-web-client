import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Error403Component } from './error403.component';
import { MockComponent } from 'ng-mocks';
import { MaskSalesmanComponent } from '../shared/images/mask-salesman/mask-salesman.component';
import { Router } from '@angular/router';

describe('Error403Component', () => {
  let component: Error403Component;
  let fixture: ComponentFixture<Error403Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Error403Component,
        MockComponent(MaskSalesmanComponent)
      ],
      providers: [
        {
          provide: Router,
          useValue: {}
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
