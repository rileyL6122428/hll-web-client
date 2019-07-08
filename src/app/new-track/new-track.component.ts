import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'hll-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit {

  @ViewChild('fileInput') fileInputElement: { nativeElement: HTMLInputElement };
  private trackName = '';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  submit(): void {
    const formData = new FormData();
    formData.append('audio-file', this.fileInputElement.nativeElement.files[0], this.trackName);

    this.httpClient.post(
      'http://localhost:8080/api/private/track',
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.idToken}`
        })
      }
    )
      .subscribe(
        (response) => {
          console.log('response', response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

}
