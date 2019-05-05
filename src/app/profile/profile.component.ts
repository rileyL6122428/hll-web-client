import { Component } from '@angular/core';
import { Track } from '../shared/play-track/play-track.component';

@Component({
  selector: 'hll-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  selected: Track = null;

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
    },
    {
      title: 'Boy with Love',
      duration: '4:54',
      likes: 6,
      tags: [
        'Pop',
        'K-Pop'
      ],
    }
  ];

  handlePlayBtnClick(selected: Track): void {
    if (this.selected === selected) {
      this.selected = null;
    } else {
      this.selected = selected;
    }
  }

}
