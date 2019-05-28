import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'hll-play-track',
  templateUrl: './play-track.component.html',
  styleUrls: ['./play-track.component.scss'],
  animations: [
    // THE FOLLOWING ANIMATION WAS ADAPTED FROM:
    //   https://stackoverflow.com/questions/46234971/angular-4-animation-not-working
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate(600, style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate(600, style({ opacity: 0, transform: 'translateX(-40px)' }))
      ])
    ])
  ]
})
export class PlayTrackComponent {

  @Input() track: Track;
  @Output() playBtnClick: EventEmitter<Track>;
  private _active: boolean;
  playIconNumber: number;
  trackCompletedPercentage = 0;

  @ViewChild('auidoPlayer')
  audio: { nativeElement: HTMLAudioElement };

  @ViewChild('#volume-slider')
  volumeSlider: HTMLInputElement;

  constructor() {
    this.playBtnClick = new EventEmitter<Track>();
    this.active = false;
  }

  ngOnInit(): void {
    this.setCharacterIcon();
  }

  hanldePlayBtnClick(): void {
    this.active = true;
    this.playBtnClick.emit(this.track);
  }

  setCharacterIcon(): void {
    this.playIconNumber = Math.floor(Math.random() * 5);
  }

  @Input()
  set active(active: boolean) {
    this._active = active;
    if (active) {
      this.play();
    } else {
      this.pause();
    }
  }

  get active(): boolean {
    return this._active;
  }

  play(): void {
    if (this.audioElement) {
      this.audioElement.play();
    }
  }

  pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  private get audioElement(): HTMLAudioElement {
    return this.audio ? this.audio.nativeElement : null;
  }

  onTimeUpdate(): void {
    this.trackCompletedPercentage = (this.audioElement.currentTime / this.audioElement.duration) * 100;
  }

  setVolume(nextVolume: string | number): void {
    if (typeof nextVolume === 'string') {
      this.audioElement.volume = Number(nextVolume);
    } else {
      this.audioElement.volume = nextVolume;
    }
  }

  testProgressIndicatorClick(event, test): void {
    debugger;
    // test.getBoundingClientRect() = THE OFFSET FROM LET BORDER OF BROWSER
    // event.clientX -> mouse offset from left border of browser
    console.log(event, test);

  }

  get progressIndicatorStyles() {
    return {
      width: `${this.trackCompletedPercentage}%`
    };
  }

}

export interface Track {
  title: string;
  duration: string;
  likes: number;
  tags: string[];
}
