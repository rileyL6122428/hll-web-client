import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BufferedPlayBack } from './buffered-playback.api';
import { range } from 'rxjs';

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
export class PlayTrackComponent implements OnInit {

  @Input() track: Track;
  @Output() playBtnClick: EventEmitter<Track>;
  @ViewChild('auidoPlayer') audioPlayer: { nativeElement: HTMLAudioElement };
  private _active: boolean;
  playIconNumber: number;
  trackCompletedPercentage = 0;

  constructor() {
    this.playBtnClick = new EventEmitter<Track>();
    this.active = false;
  }

  ngOnInit(): void {
    this.setCharacterIcon();
  }

  hanldePlayBtnClick(): void {
    this.active = !this.active;
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
    return this.audioPlayer ? this.audioPlayer.nativeElement : null;
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

  selectCurrentTrackTime(mouseX: number, progressBarDOMRect: DOMRect): void {
    if (this.audioElement) {
      const currentTimeDecimal = (mouseX - progressBarDOMRect.x) / progressBarDOMRect.width;
      this.audioElement.currentTime = currentTimeDecimal * this.audioElement.duration;
    }
  }

  get progressIndicatorStyles() {
    return {
      width: `${this.trackCompletedPercentage}%`
    };
  }

  get bufferedAudio(): TimeRanges {
    return this.audioElement && this.audioElement.buffered;
  }

  updateBufferedAudio() {
    if (this.bufferedAudio) {
      for (let index = 0; index < this.bufferedAudio.length; index++) {
        const start = this.bufferedAudio.start(index);
        const end = this.bufferedAudio.end(index);
        console.log(`Buffered range ${index + 1}: (${start}, ${end})`);
      }
    }
  }

  get trackBufferedPercentage(): number {
    let bufferedPercentage = 0;

    if (this.bufferedAudio) {
      const start = this.bufferedAudio.start(0);
      const end = this.bufferedAudio.end(0);
      const duration = this.audioElement.duration;
      const bufferedDecimal = (end - start) / duration;
      bufferedPercentage = bufferedDecimal * 100;
    }

    return bufferedPercentage;
  }

  get progressBufferStyles() {
    return {
      width: `${this.trackBufferedPercentage - this.trackCompletedPercentage}%`
    };
  }

  // NEW BUFFERED AUDIO METHODS

  get bufferedAudioRanges(): BufferedPlayBack[] {
    if (!this.audioElement) { return []; }

    const ranges: BufferedPlayBack[] = [];

    for (let index = 0; index < this.bufferedAudio.length; index++) {
      const bufferStart = this.bufferedAudio.start(index);
      const bufferEnd = this.bufferedAudio.end(index);
      const duration = this.audioElement.duration;
      const currentTime = this.audioElement.currentTime;

      const containsCurrentPlayBack =
        currentTime >= bufferStart &&
        currentTime <= bufferEnd;

      const bufferWidth = (bufferEnd - bufferStart) / duration;
      const bufferOffset = bufferStart / duration;
      const currentTimeWidth = containsCurrentPlayBack ? (currentTime - bufferStart) / duration : 0;

      ranges.push({
        containsCurrentPlayBack,

        currentPlayBackStyles: {
          left: `${bufferOffset * 100}%`,
          width: `${currentTimeWidth * 100}%`
        },

        bufferedStyles: {
          left: `${(bufferOffset + currentTimeWidth) * 100}%`,
          width: `${(bufferWidth - currentTimeWidth) * 100}%`
        }
      });
    }

    return ranges;
  }

}

export interface Track {
  title: string;
  duration: string;
  likes: number;
  tags: string[];
}
