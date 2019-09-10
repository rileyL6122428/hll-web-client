import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { MockComponent } from 'ng-mocks';
import { SiteLogoComponent } from '../shared/site-logo/site-logo.component';
import { TrackPlayerComponent } from '../shared/track-player/track-player.component';
import { AuthService } from '../shared/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TrackHttpClient } from '../shared/http-clients/track.http';
import { Observer, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {

  let profileComponent: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let authServiceMock: any;
  let trackClientMock: any;
  let getTracksObserver: Observer<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],

      declarations: [
        MockComponent(SiteLogoComponent),
        MockComponent(TrackPlayerComponent),
        ProfileComponent
      ],

      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['logout'])
        },
        {
          provide: TrackHttpClient,
          useValue: jasmine.createSpyObj('TrackHttpClient', ['getTracks'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    profileComponent = fixture.componentInstance;

    authServiceMock = TestBed.get(AuthService);
    trackClientMock = TestBed.get(TrackHttpClient);
    _stubGetTracks();
  });

  it('should create', () => {
    expect(profileComponent).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it(`tells the trackClient to 'getTracks'`, () => {
      authServiceMock.userID = 'EXAMPLE_USER_ID';
      fixture.detectChanges();
      expect(trackClientMock.getTracks).toHaveBeenCalledWith({
        userId: 'EXAMPLE_USER_ID'
      });
    });

    it('maps fetched tracks and renders a track component for each response track', () => {
      fixture.detectChanges();

      const unmappedTracks: any[] = [
        {
          id: 'EXAMPLE_ID_1',
          title: 'EXAMPLE_TITLE_1',
          duration: 1
        },
        {
          id: 'EXAMPLE_ID_2',
          title: 'EXAMPLE_TITLE_2',
          duration: 2
        }
      ];
      getTracksObserver.next(unmappedTracks);
      getTracksObserver.complete();

      fixture.detectChanges();

      const trackPlayerComponents = _getTrackComponents();
      expect(trackPlayerComponents.length).toBe(2);
      trackPlayerComponents.forEach((component, index) => {
        const mappedTrack = component.track;
        const unmappedTrack = unmappedTracks[index];

        expect(mappedTrack.title).toEqual(unmappedTrack.name);
        expect(mappedTrack.duration).toEqual(`${unmappedTrack.duration}.00`);
        expect(mappedTrack.uri)
          .toEqual(`http://localhost:8080/api/public/track/${unmappedTrack.id}/stream`);
      });
    });
  });

  describe('Header', () => {
    beforeEach(() => fixture.detectChanges());

    it('clicking the log out link tells the auth service to log out', () => {
      const logOutLink = fixture.elementRef.nativeElement.querySelector('#logout') as HTMLElement;
      logOutLink.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const authService = TestBed.get(AuthService);
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  function _stubGetTracks() {
    trackClientMock.getTracks.and.returnValue(new Observable(
      (observer) => getTracksObserver = observer
    ));
  }

  function _getTrackComponents() {
    return fixture
      .debugElement
      .queryAll(By.css('hll-track-player'))
      .map((debugElement) => debugElement.componentInstance as TrackPlayerComponent);
  }
});
