import { Injectable } from '@angular/core';
import { BufferedPlayBack as BufferedAudio } from './buffered-audio.api';

@Injectable({
  providedIn: 'root'
})
export class TrackPlayer {

  private audioElement: HTMLAudioElement;
  private _readyToBuffer = false;
  private _initialized = false;

  set element(audioElement: HTMLAudioElement) {
    if (audioElement && !this._initialized) {
      this.audioElement = audioElement;
      this._initialized = true;
      this.play();
    }
  }

  play(): void {
    if (this.audioElement) {
      this.audioElement.play();
    }

    if (!this._readyToBuffer) {
      this._readyToBuffer = true;
    }
  }

  pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  set volume(nextVolume: string | number) {
    if (this.audioElement && typeof nextVolume === 'string') {
      this.audioElement.volume = Number(nextVolume);

    } else if (this.audioElement && typeof nextVolume === 'number') {
      this.audioElement.volume = nextVolume;
    }
  }

  set currentTime(currentTimeDecimal: number) {
    this.audioElement.currentTime = currentTimeDecimal * this.audioElement.duration;
  }

  get initialized(): boolean {
    return this._initialized;
  }

  get readyToBuffer(): boolean {
    return this._readyToBuffer;
  }

  get bufferedAudioRanges(): BufferedAudio[] {
    const bufferedAudioRanges: BufferedAudio[] = [];

    if (this.audioElement) {
      for (let bufferIndex = 0; bufferIndex < this.audioElement.buffered.length; bufferIndex++) {
        const nextBufferedRange = this.bufferedAudioRangeBy(bufferIndex);
        bufferedAudioRanges.push(nextBufferedRange);
      }
    }

    return bufferedAudioRanges;
  }

  private bufferedAudioRangeBy(bufferIndex: number): BufferedAudio {
    const bufferStart = this.audioElement.buffered.start(bufferIndex);
    const bufferEnd = this.audioElement.buffered.end(bufferIndex);
    const trackDuration = this.audioElement.duration;
    const currentTime = this.audioElement.currentTime;

    const bufferContainsCurrentPlayBack =
      currentTime >= bufferStart &&
      currentTime <= bufferEnd;

    const bufferWidth = (bufferEnd - bufferStart) / trackDuration;
    const bufferOffset = bufferStart / trackDuration;
    const trackProgressWidth = bufferContainsCurrentPlayBack ?
      (currentTime - bufferStart) / trackDuration :
      0;

    return {
      containsCurrentPlayBack: bufferContainsCurrentPlayBack,

      currentPlayBackStyles: {
        left: `${bufferOffset * 100}%`,
        width: `${trackProgressWidth * 100}%`
      },

      bufferedStyles: {
        left: `${(bufferOffset + trackProgressWidth) * 100}%`,
        width: `${(bufferWidth - trackProgressWidth) * 100}%`
      }
    };
  }

}
