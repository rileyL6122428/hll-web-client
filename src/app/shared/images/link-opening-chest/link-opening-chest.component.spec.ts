import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOpeningChestComponent } from './link-opening-chest.component';

describe('LinkOpeningChestComponent', () => {
  let component: LinkOpeningChestComponent;
  let fixture: ComponentFixture<LinkOpeningChestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkOpeningChestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOpeningChestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
