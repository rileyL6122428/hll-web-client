import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';
import { TrackHttpClient } from '../shared/http-clients/track.http';
import { Router } from '@angular/router';

@Component({
  selector: 'hll-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent {

  trackName = '';
  uploading = false;
  showUploadErrorMessage = false;
  private stagedFile: File;

  constructor(
    private router: Router,
    private trackClient: TrackHttpClient
  ) { }

  submit(): void {
    this.uploading = true;

    this.trackClient.upload({
      filename: this.trackName,
      file: this.stagedFile,
    })
      .subscribe(
        () => {
          this.router.navigateByUrl('/profile');
        },

        (error) => {
          this.showUploadErrorMessage = true;
          this.uploading = false;
        }
      );
  }

  onFileChange(file: File): void {
    if (file) {
      this.stagedFile = file;
    }
  }

}
