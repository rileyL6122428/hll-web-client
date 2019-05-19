import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404Component } from './error404.component';
import { MockComponent } from 'ng-mocks';
import { MaskSalesmanComponent } from '../shared/images/mask-salesman/mask-salesman.component';
import { Router } from '@angular/router';

describe('Error404Component', () => {

  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Error404Component,
        MockComponent(MaskSalesmanComponent)
      ],
      providers: [
        {
          provide: Router,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
