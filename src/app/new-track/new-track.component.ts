import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrackHttpClient } from 'hll-shared-client';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent {

  uploading = false;
  showUploadErrorMessage = false;
  trackName = '';
  private trackContents: File;

  constructor(
    private router: Router,
    private trackClient: TrackHttpClient,
    private auth: AuthService
  ) { }

  submit(): void {
    this.uploading = true;

    this.trackClient.upload({
      name: this.trackName,
      contents: this.trackContents,
      bearerToken: this.auth.idToken
    })
      .subscribe(
        () => this.router.navigateByUrl('/profile'),

        (error) => {
          this.showUploadErrorMessage = true;
          this.uploading = false;
        }
      );
  }

  onFileChange(file: File): void {
    if (file) {
      this.trackContents = file;
    }
  }

}
