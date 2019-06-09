import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayTrackComponent } from './play-track.component';
import { FluteSkullkidComponent } from '../images/flute-skullkid/flute-skullkid.component';
import { MockComponent } from 'ng-mocks';
import { PipesDekukidComponent } from '../images/pipes-dekukid/pipes-dekukid.component';
import { DrumsGoronLinkComponent } from '../images/drums-goron-link/drums-goron-link.component';
import { GuitarZoraLinkComponent } from '../images/guitar-zora-link/guitar-zora-link.component';
import { LyreSheikComponent } from '../images/lyre-sheik/lyre-sheik.component';
import { PlayButtonComponent } from '../images/play-button/play-button.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PauseButtonComponent } from '../images/pause-button/pause-button.component';
import { Track } from './track.api';
import { AudioPlayer } from './audio-player.service';
import { BufferedPlayBack } from './buffered-audio.api';

describe('PlayTrackComponent', () => {

  let component: PlayTrackComponent;
  let fixture: ComponentFixture<PlayTrackComponent>;
  let track: Track;
  let audioPlayer: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        MockComponent(FluteSkullkidComponent),
        MockComponent(PipesDekukidComponent),
        MockComponent(DrumsGoronLinkComponent),
        MockComponent(GuitarZoraLinkComponent),
        MockComponent(LyreSheikComponent),
        MockComponent(PlayButtonComponent),
        MockComponent(PauseButtonComponent),
        PlayTrackComponent
      ]
    });

    TestBed.overrideComponent(PlayTrackComponent, {
      set: {
        providers: [
          {
            provide: AudioPlayer,
            useFactory: () => audioPlayer = jasmine.createSpyObj('AudioPlayer', ['play', 'pause'])
          },
        ]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(async(() => {
    track = {
      title: 'Clock Town Remix',
      duration: '3:54',
      likes: 5,
      tags: ['Video Game', 'Remix'],
      uri: 'http://localhost:9876/base/test-assets/audio/clock-town-remix.mp3'
    } as Track;
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayTrackComponent);
    component = fixture.componentInstance;
    component.track = track;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Play Button', () => {

    beforeEach(() => fixture.detectChanges());

    it('shows play icon when unselected', () => {
      expect(_getPlayIcon()).toBeTruthy();
    });

    it('inverts play icon color scheme when hovered', () => {
      _getPlayButtonElement().dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();

      expect(_getPlayIcon().invertColors).toBe(true);
    });

    it('restores play icon color scheme when mouse over is lost', () => {
      _getPlayButtonElement().dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('mouseout'));
      fixture.detectChanges();

      expect(_getPlayIcon().invertColors).toBe(false);
    });

    it('shows pause icon when track is selected', () => {
      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(_getPauseIcon()).toBeTruthy();
    });

    it('restores play icon when track is selected and then deselected', () => {
      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(_getPlayIcon()).toBeTruthy();
    });

    it('tells the AudioPlayer to play when clicked', () => {
      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(audioPlayer.play).toHaveBeenCalled();
    });

    it('tells the audio element to pause when clicked twice', () => {
      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(audioPlayer.pause).toHaveBeenCalled();
    });

    function _getPlayIcon() {
      return fixture.debugElement.query(By.css('hll-play-button')).componentInstance;
    }

    function _getPauseIcon() {
      return fixture.debugElement.query(By.css('hll-pause-button')).componentInstance;
    }
  });

  describe('Volume Slider', () => {

    it(`starts with value equal to '1'`, () => {
      expect(_getVolumeSlider().value).toEqual('1');
    });

    it('changes AudioPlayer volume on value change', () => {
      const volumeElement = _getVolumeSlider();
      volumeElement.value = '0.55';
      volumeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(audioPlayer.volume).toEqual('0.55');
    });

    function _getVolumeSlider(): HTMLInputElement {
      return fixture.elementRef.nativeElement.querySelector('.volume-slider');
    }
  });

  describe('Character Icons', () => {
    it('sets flute-skull-kid as play button icon when next random number is between 0 and .2', () => {
      spyOn(Math, 'random').and.returnValue(.1);
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-pipes-dekukid as play button icon when play button clicked and next random number between .2 and .4', () => {
      spyOn(Math, 'random').and.returnValue(.3);
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-drums-goron-link as play button icon when play button clicked and next random number between .4 and .6', () => {
      spyOn(Math, 'random').and.returnValue(.5);
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-guitar-zora-link as play button icon when play button clicked and next random number between .6 and .8', () => {
      spyOn(Math, 'random').and.returnValue(.7);
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-lyre-sheik as play button icon when play button clicked and next random number between .8 and 1', () => {
      spyOn(Math, 'random').and.returnValue(.9);
      fixture.detectChanges();

      _getPlayButtonElement().dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeTruthy();
    });

  });

  describe('Track Details', () => {

    beforeEach(() => fixture.detectChanges());

    it('renders track-header with title and duration', () => {
      const trackHeader = fixture.elementRef.nativeElement.querySelector('.track-details .track-header') as HTMLElement;
      expect(trackHeader.innerText).toContain(track.title);
      expect(trackHeader.innerText).toContain(track.duration);
    });

    it('renders track-populatity-tags with heart count and tag list', () => {
      const trackPopularityAndTags = fixture.elementRef.nativeElement.querySelector('.track-details .track-popularity-tags') as HTMLElement;
      expect(trackPopularityAndTags.innerText).toContain(`${track.likes} hearts`);
      track.tags.forEach(tag => {
        expect(trackPopularityAndTags.innerText).toContain(tag);
      });
    });
  });

  describe('ngAfterViewInit', () => {
    it('passes the HTML audioElement to the AudioPlayer Service', () => {
      fixture.detectChanges();
      expect(audioPlayer.element).toBe(_getAudioElement());
    });
  });

  describe('Progress Indicator', () => {

    it(`renders one 'buffered-fill' element when audioPlayer.bufferedAudioRanges returns a single bufferedRange`, () => {
      audioPlayer.bufferedAudioRanges = [{
        bufferedStyles: {},
        currentPlayBackStyles: {},
        containsCurrentPlayBack: true
      }] as BufferedPlayBack[];

      fixture.detectChanges();

      expect(_getBufferedFillElements().length).toEqual(1);
    });

    it(`renders multiple 'buffered-fill' elements when audioPlayer.bufferedAudioRanges returns multiple bufferedRanges`, () => {
      audioPlayer.bufferedAudioRanges = [
        {
          bufferedStyles: {},
          currentPlayBackStyles: {},
          containsCurrentPlayBack: false
        },
        {
          bufferedStyles: {},
          currentPlayBackStyles: {},
          containsCurrentPlayBack: true
        }
      ] as BufferedPlayBack[];

      fixture.detectChanges();

      expect(_getBufferedFillElements().length).toEqual(2);
    });

    it(`renders playback-progress element in the correct buffered range`, () => {
      audioPlayer.bufferedAudioRanges = [
        {
          bufferedStyles: {},
          currentPlayBackStyles: {},
          containsCurrentPlayBack: false
        },
        {
          bufferedStyles: {},
          currentPlayBackStyles: {},
          containsCurrentPlayBack: true
        },
        {
          bufferedStyles: {},
          currentPlayBackStyles: {},
          containsCurrentPlayBack: false
        }
      ] as BufferedPlayBack[];

      fixture.detectChanges();

      const allPlayProgressElements = _getAllPlayProgressElements();
      expect(allPlayProgressElements.length).toEqual(4);
      expect(allPlayProgressElements[0].classList).toContain('buffered-fill');
      expect(allPlayProgressElements[1].classList).toContain('play-progress-fill');
      expect(allPlayProgressElements[2].classList).toContain('buffered-fill');
      expect(allPlayProgressElements[3].classList).toContain('buffered-fill');
    });

    function _getBufferedFillElements(): HTMLElement[] {
      return Array.from(
        fixture.elementRef.nativeElement.querySelectorAll('.buffered-fill')
      );
    }

    function _getAllPlayProgressElements(): HTMLElement[] {
      return Array.from(
        fixture.elementRef.nativeElement.querySelectorAll('.buffered-fill, .play-progress-fill')
      );
    }
  });

  function _getAudioElement(): HTMLAudioElement {
    return fixture.elementRef.nativeElement.querySelector('audio');
  }

  function _getPlayButtonElement(): HTMLButtonElement {
    return fixture.elementRef.nativeElement.querySelector('button');
  }
});
