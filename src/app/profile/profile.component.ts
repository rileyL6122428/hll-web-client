import { Component } from '@angular/core';
import { Track } from '../shared/track-player/track.api';
import { AuthService } from '../shared/auth/auth.service';
import { TrackHttpClient } from '../shared/http-clients/track.http';

@Component({
  selector: 'hll-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    private auth: AuthService,
    private trackClient: TrackHttpClient
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
      uri: 'http://localhost:8080/api/public/track/5d1ac30046c73d87843b0c64/stream'
    },
  ];

  ngOnInit(): void {
    // this.trackClient
    //   .getTracks({ userId: 'rileylittlefield@ymail.com' })
    //   .subscribe((response) => {
    //     this.tracks = response.map(unmappedTrack => ({
    //         uri: `http://localhost:8080/api/public/track/${unmappedTrack.id}/stream`,
    //         title: unmappedTrack.name,
    //         tags: [],
    //         likes: 0,
    //         duration: '3:00'
    //       } as Track)
    //     );
    //   });
  }

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
