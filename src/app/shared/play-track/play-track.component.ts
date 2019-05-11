import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hll-play-track',
  templateUrl: './play-track.component.html',
  styleUrls: ['./play-track.component.scss']
})
export class PlayTrackComponent {

  @Input() track: Track;
  @Output() playBtnClick: EventEmitter<Track>;
  @Input() active: boolean;
  playIconNumber: number;

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

}

export interface Track {
  title: string;
  duration: string;
  likes: number;
  tags: string[];
  // active: boolean;
}
