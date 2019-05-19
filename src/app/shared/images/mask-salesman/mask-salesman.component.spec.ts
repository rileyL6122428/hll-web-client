import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskSalesmanComponent } from './mask-salesman.component';

describe('MaskSalesmanComponent', () => {
  let component: MaskSalesmanComponent;
  let fixture: ComponentFixture<MaskSalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskSalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskSalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
