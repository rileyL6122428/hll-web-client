import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BufferedPlayBack as BufferedAudio } from './buffered-audio.api';
import { Track } from './track.api';
import { AudioPlayer } from './audio-player.service';

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
  ],
  providers: [ AudioPlayer ]
})
export class PlayTrackComponent implements OnInit, AfterViewInit {

  @Input() track: Track;
  @Output() playBtnClick: EventEmitter<Track>;
  selectedCharacterIndex: number;

  @ViewChild('audio')
  private audioPlayerViewChild: { nativeElement: HTMLAudioElement };
  private _active: boolean;

  constructor(
    private audioPlayer: AudioPlayer
  ) {
    this.playBtnClick = new EventEmitter<Track>();
    this.active = false;
  }

  ngOnInit(): void {
    this.randomlyChooseCharacterIcon();
  }

  private randomlyChooseCharacterIcon(): void {
    const characterTotal = 5;
    this.selectedCharacterIndex = Math.floor(Math.random() * characterTotal);
  }

  ngAfterViewInit(): void {
    this.audioPlayer.element = this.audioPlayerViewChild.nativeElement;
  }

  onAudioElementUpdate(): void {
    /**
     * PLACEHOLDER TO TRIGGER ANGULAR CHANGE DETECTION
     *
     * REMOVING THIS BLOCK WILL PREVENT TRACK PROGRESS UI
     * FROM UPDATING
     */
  }

  selectCurrentTime(mouseX: number, progressBar: DOMRect): void {
    this.audioPlayer.currentTime = (mouseX - progressBar.x) / progressBar.width;
  }

  hanldePlayBtnClick(): void {
    this.active = !this.active;
    this.playBtnClick.emit(this.track);
  }

  @Input()
  set active(active: boolean) {
    this._active = active;
    active ? this.audioPlayer.play() : this.audioPlayer.pause();
  }

  get active(): boolean {
    return this._active;
  }

  set volume(volume: string | number) {
    this.audioPlayer.volume = volume;
  }

  get bufferedAudioRanges(): BufferedAudio[] {
    return this.audioPlayer.bufferedAudioRanges;
  }

}
