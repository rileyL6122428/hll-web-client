import { Component } from '@angular/core';
import { Track } from '../shared/play-track/play-track.component';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    private auth: AuthService
  ) { }

  selected: Track = null;

  tracks: Track[] = [
    {
      title: 'Hey Look Ma I Made it!',
      duration: '3:54',
      likes: 5,
      tags: [
        'video-game',
        'hip hop',
        'mixed'
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

  logout(): void {
    this.auth.logout();
  }

}
