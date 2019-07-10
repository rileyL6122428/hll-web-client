import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTrackComponent } from './new-track.component';
import { FormsModule } from '@angular/forms';
import { LinkOpeningChestComponent } from '../shared/images/link-opening-chest/link-opening-chest.component';
import { MockComponent } from 'ng-mocks';

describe('NewTrackComponent', () => {
  let component: NewTrackComponent;
  let fixture: ComponentFixture<NewTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        NewTrackComponent,
        MockComponent(LinkOpeningChestComponent)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
