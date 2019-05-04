import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesDekukidComponent } from './pipes-dekukid.component';

describe('PipesDekukidComponent', () => {
  let component: PipesDekukidComponent;
  let fixture: ComponentFixture<PipesDekukidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipesDekukidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipesDekukidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
