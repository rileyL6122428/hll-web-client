import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hll-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  selected: Track;

  tracks: Track[] = [
    {
      title: 'Hey, Look, Listen!',
      duration: '3:54',
      likes: 5,
      tags: [
        'video-game',
        'hip hop',
        'mixed'
      ],
      active: false
    },
    {
      title: 'Boy with Love',
      duration: '4:54',
      likes: 6,
      tags: [
        'Pop',
        'K-Pop'
      ],
      active: false
    }
  ];

  handlePlayBtnClick(selected: Track): void {
    if (this.selected && this.selected === selected) {
      this.selected.active = !this.selected.active;

    } else if (this.selected && this.selected !== selected) {
      this.selected.active = false;
      selected.active = true;
      this.selected = selected;

    } else if (!this.selected) {
      selected.active = true;
      this.selected = selected;
    }
  }

}

export interface Track {
  title: string;
  duration: string;
  likes: number;
  tags: string[];
  active: boolean;
}
