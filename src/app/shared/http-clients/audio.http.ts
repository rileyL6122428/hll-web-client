import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioHttpClient {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadTrack(): Observable<any> {
    return null;
  }

}
