import { Component, OnInit } from '@angular/core';
import { Track } from '../shared/track-player/track.api';
import { AuthService } from '../shared/auth/auth.service';
import { TrackHttpClient } from 'hll-shared-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hll-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private trackClient: TrackHttpClient
  ) { }

  selected: Track = null;

  tracks: Track[] = [];

  ngOnInit(): void {
    this.trackClient
      .getTracks({ userId: this.auth.userID })
      .subscribe((response) => {
        this.tracks = response.map(unmappedTrack => ({
          id: unmappedTrack.id,
          uri: environment.API.TRACKS.STREAM_SINGLE_TRACK({ trackId: unmappedTrack.id }),
          title: unmappedTrack.name,
          duration: (unmappedTrack.duration as number).toFixed(2)
        } as Track));
      });
  }

  handlePlayBtnClick(selected: Track): void {
    if (this.selected === selected) {
      this.selected = null;
    } else {
      this.selected = selected;
    }
  }

  handleDeleteBtnClick(track: Track, trackIndex: number): void {
    const bearerToken = this.auth.idToken;
    this.trackClient.delete({ track, bearerToken }).subscribe();
    this.tracks.splice(trackIndex, 1);
  }

  logout(): void {
    this.auth.logout();
  }

}
