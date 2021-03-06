import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { TrackHttpClient } from 'hll-shared-client';
import { LinkOpeningChestComponent } from '../shared/images/link-opening-chest/link-opening-chest.component';
import { NewTrackComponent } from './new-track.component';
import { AuthService } from '../shared/auth/auth.service';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

describe('NewTrackComponent', () => {

  let component: NewTrackComponent;
  let fixture: ComponentFixture<NewTrackComponent>;
  let trackClientMock: any;
  let uploadObserver: Observer<any>;
  let routerMock: any;

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
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
        },
        {
          provide: AuthService,
          useValue: { idToken: 'EXAMPLE_ID_TOKEN' }
        }
      ]
    })
    .compileComponents();

    trackClientMock = TestBed.get(TrackHttpClient);
    routerMock = TestBed.get(Router);
    _stubUploadObservable();
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
    let trackContents: File;

    beforeEach(() => {
      trackName = 'EXAMPLE_TRACK_UPLOAD_NAME';
      _getTrackNameInput().value = trackName;
      _getTrackNameInput().dispatchEvent(new Event('input'));

      trackContents = new File([], 'EXAMPLE_LOCAL_FILE_NAME');
      component.onFileChange(trackContents);

      _getSubmitButton().click();

      fixture.detectChanges();
    });

    it('hides error message by default', () => {
      expect(_getErrorMessage()).toBeFalsy();
    });

    it('delegates upload to trackClient', () => {
      expect(trackClientMock.upload).toHaveBeenCalledWith({
        name: trackName,
        contents: trackContents,
        bearerToken: 'EXAMPLE_ID_TOKEN'
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

    it('navigates to profile page on succesful load', async(() => {
      uploadObserver.next('UPLOAD_SUCCESSFUL');
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/profile');
    }));

    it('shows an error message if the upload fails', () => {
      uploadObserver.error('EXAMPLE_ERROR');
      fixture.detectChanges();
      expect(_getErrorMessage()).toBeTruthy();
    });

    it('hides error message when clicking the error message\'s close button', () => {
      uploadObserver.error('EXAMPLE_ERROR');
      fixture.detectChanges();
      _getErrorMessageCloseButton().click();
      fixture.detectChanges();
      expect(_getErrorMessage()).toBeFalsy();
    });

    it('re-enables the submit button if the upload fails', () => {
      uploadObserver.error('EXAMPLE_ERROR');
      fixture.detectChanges();
      expect(_getSubmitButton().disabled).toBe(false);
    });

  });

  function _getTrackNameInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('#track-name');
  }

  function _getSubmitButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('#submit-button');
  }

  function _getSubmitText(): HTMLElement {
    return fixture.nativeElement.querySelector('#submit-text');
  }

  function _getLoaderIcon(): HTMLElement {
    return fixture.nativeElement.querySelector('#loader-icon');
  }

  function _getLoadingText(): HTMLElement {
    return fixture.nativeElement.querySelector('#loading-text');
  }

  function _getErrorMessage(): HTMLElement {
    return fixture.nativeElement.querySelector('#upload-error-message');
  }

  function _getErrorMessageCloseButton(): HTMLElement {
    return fixture.nativeElement.querySelector('#close-upload-error-message');
  }

  function _stubUploadObservable() {
    trackClientMock.upload.and.returnValue(new Observable<any>(observer => {
      uploadObserver = observer;
    }));
  }

});
