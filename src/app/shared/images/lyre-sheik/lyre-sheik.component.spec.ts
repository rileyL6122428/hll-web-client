import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyreSheikComponent } from './lyre-sheik.component';

describe('LyreSheikComponent', () => {
  let component: LyreSheikComponent;
  let fixture: ComponentFixture<LyreSheikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyreSheikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyreSheikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
