import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumsGoronLinkComponent } from './drums-goron-link.component';

describe('DrumsGoronLinkComponent', () => {
  let component: DrumsGoronLinkComponent;
  let fixture: ComponentFixture<DrumsGoronLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumsGoronLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumsGoronLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
