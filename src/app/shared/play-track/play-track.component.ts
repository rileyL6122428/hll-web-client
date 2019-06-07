import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BufferedPlayBack as BufferedAudio } from './buffered-audio.api';

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
  selectedCharacterIndex: number;
  bufferedAudioRanges: BufferedAudio[];
  private _active: boolean;

  constructor() {
    this.playBtnClick = new EventEmitter<Track>();
    this.active = false;
  }

  ngOnInit(): void {
    this.randomlyChooseCharacterIcon();
  }

  randomlyChooseCharacterIcon(): void {
    const characterTotal = 5;
    this.selectedCharacterIndex = Math.floor(Math.random() * characterTotal);
  }

  hanldePlayBtnClick(): void {
    this.active = !this.active;
    this.playBtnClick.emit(this.track);
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

  onAudioUpdate(): void {
    this.setBufferedAudioRanges();
  }

  setBufferedAudioRanges(): void {
    this.bufferedAudioRanges = [];
    if (this.audioElement) {
      for (let bufferIndex = 0; bufferIndex < this.audioElement.buffered.length; bufferIndex++) {
        const nextBufferedRange = this.getBufferedRange(bufferIndex);
        this.bufferedAudioRanges.push(nextBufferedRange);
      }
    }

  }

  getBufferedRange(bufferIndex: number): BufferedAudio {
    const bufferStart = this.audioElement.buffered.start(bufferIndex);
    const bufferEnd = this.audioElement.buffered.end(bufferIndex);
    const trackDuration = this.audioElement.duration;
    const currentTime = this.audioElement.currentTime;

    const bufferContainsCurrentPlayBack =
      currentTime >= bufferStart &&
      currentTime <= bufferEnd;

    const bufferWidth = (bufferEnd - bufferStart) / trackDuration;
    const bufferOffset = bufferStart / trackDuration;
    const trackProgressWidth = bufferContainsCurrentPlayBack ?
      (currentTime - bufferStart) / trackDuration :
      0;

    return {
      containsCurrentPlayBack: bufferContainsCurrentPlayBack,

      currentPlayBackStyles: {
        left: `${bufferOffset * 100}%`,
        width: `${trackProgressWidth * 100}%`
      },

      bufferedStyles: {
        left: `${(bufferOffset + trackProgressWidth) * 100}%`,
        width: `${(bufferWidth - trackProgressWidth) * 100}%`
      }
    };
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

  private get audioElement(): HTMLAudioElement {
    return this.audioPlayer ? this.audioPlayer.nativeElement : null;
  }

}

export interface Track {
  title: string;
  duration: string;
  likes: number;
  tags: string[];
}
