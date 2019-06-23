import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'hll-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit {

  audioFile: File;
  @ViewChild('fileInput') fileInputElement: { nativeElement: HTMLInputElement };

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  submit(): void {
    const formData = new FormData();
    formData.append('audio-file', this.fileInputElement.nativeElement.files[0], 'TESTING');

    this.httpClient.post(
      'http://localhost:8080/api/public/audio/upload',
      formData
    )
      .subscribe((response) => {
        console.log('response', response);
      });
  }

}
