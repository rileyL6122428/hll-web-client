import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { TrackHttpClient } from '../shared/http-clients/track.http';
import { LinkOpeningChestComponent } from '../shared/images/link-opening-chest/link-opening-chest.component';
import { NewTrackComponent } from './new-track.component';
import { AuthService } from '../shared/auth/auth.service';

fdescribe('NewTrackComponent', () => {

  let component: NewTrackComponent;
  let fixture: ComponentFixture<NewTrackComponent>;
  let trackClientMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        NewTrackComponent,
        MockComponent(LinkOpeningChestComponent)
      ],
      providers: [
        {
          provide: TrackHttpClient,
          useValue: jasmine.createSpyObj('TrackClientConfig', ['upload'])
        },
        {
          provide: AuthService,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    trackClientMock = TestBed.get(TrackHttpClient);
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(NewTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('file upload', () => {

    let trackName: string;
    let trackFile: File;

    beforeEach(() => {
      trackName = 'EXAMPLE_TRACK_UPLOAD_NAME';
      _getTrackNameInput().value = trackName;
      _getTrackNameInput().dispatchEvent(new Event('input'));

      trackFile = new File([], 'EXAMPLE_LOCAL_FILE_NAME');
      component.onFileChange(trackFile);

      _getSubmitButton().click();

      fixture.detectChanges();
    });

    it('delegates upload to trackClient', () => {
      expect(trackClientMock.upload).toHaveBeenCalledWith({
        filename: trackName,
        file: trackFile,
      });
    });

    it('disables submission button after beginning upload', () => {
      expect(_getSubmitButton().disabled).toBe(true);
    });

    it('hides button submit text and replaces it with loading text', () => {
      expect(_getSubmitText()).toBeFalsy();
      expect(_getLoaderIcon()).toBeTruthy();
      expect(_getLoadingText()).toBeTruthy();
    });
  });

  function _getTrackNameInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('#track-name');
  }

  function _getSubmitButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#submit-button');
  }

  function _getSubmitText(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#submit-text');
  }

  function _getLoaderIcon(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#loader-icon');
  }

  function _getLoadingText(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#loading-text');
  }
});
