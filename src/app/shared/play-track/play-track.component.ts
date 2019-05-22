import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'hll-play-track',
  templateUrl: './play-track.component.html',
  styleUrls: ['./play-track.component.scss']
})
export class PlayTrackComponent {

  @Input() track: Track;
  @Output() playBtnClick: EventEmitter<Track>;
  private _active: boolean;
  playIconNumber: number;

  @ViewChild('auidoPlayer')
  audio: { nativeElement: HTMLAudioElement };

  constructor() {
    this.playBtnClick = new EventEmitter<Track>();
    this.active = false;
    this.playIconNumber = -1;
  }

  hanldePlayBtnClick(): void {
    this.active = true;
    this.playBtnClick.emit(this.track);
    this.setNextIcon();
  }

  setNextIcon(): void {
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

}

export interface Track {
  title: string;
  duration: string;
  likes: number;
  tags: string[];
}
