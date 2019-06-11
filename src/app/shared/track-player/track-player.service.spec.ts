import { TestBed } from '@angular/core/testing';

import { TrackPlayer } from './track-player.service';

describe('TrackPlayerService', () => {

  let trackPlayer: TrackPlayer;
  let audioElement: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TrackPlayer ]
    });

    trackPlayer = TestBed.get(TrackPlayer);
    audioElement = jasmine.createSpyObj('HTMLAudioElement', [
      'play',
      'pause',
    ]);
    trackPlayer.element = audioElement;
  });

  it('instantiates', () => expect(trackPlayer).toBeTruthy());

  describe('#play', () => {
    it('tells the audioElement to play', () => {
      trackPlayer.play();
      expect(audioElement.play).toHaveBeenCalled();
    });
  });

  describe('#pause', () => {
    it('tells the audioElement to pause', () => {
      trackPlayer.pause();
      expect(audioElement.pause).toHaveBeenCalled();
    });
  });

  describe('#set volume', () => {
    it('sets the volume on the audioElement as a number', () => {
      trackPlayer.volume = '0.4';
      expect(audioElement.volume).toEqual(0.4);
    });
  });

  describe('#set currentTime', () => {
    it('sets the time as the provided decimal times the track duration', () => {
      audioElement.duration = 6;
      trackPlayer.currentTime = 0.5;
      expect(audioElement.currentTime).toEqual(3);
    });
  });

  describe('#get bufferedAudioRanges', () => {

    beforeEach(() => {
      audioElement.duration = 180;
      audioElement.currentTime = 61;

      audioElement.buffered = {
        length: 3,

        start(index: number): number {
          let bufferStart: number;

          if (index === 0) {
            bufferStart = 0;
          } else if (index === 1) {
            bufferStart = 60;
          } else if (index === 2) {
            bufferStart = 120;
          }

          return bufferStart;
        },

        end(index: number): number {
          let bufferEnd: number;

          if (index === 0) {
            bufferEnd = 30;
          } else if (index === 1) {
            bufferEnd = 90;
          } else if (index === 2) {
            bufferEnd = 150;
          }

          return bufferEnd;
        },
      };

    });

    it('returns a buffered audio range for each of the buffered ranges in the audioElement', () => {
      expect(trackPlayer.bufferedAudioRanges.length).toEqual(3);
    });

    it(`sets containsCurrentPlayBack to true on the buffered audio range containing the current playblack`, () => {
      const [
        firstRange,
        secondRange,
        thirdRange
      ] = trackPlayer.bufferedAudioRanges;

      expect(firstRange.containsCurrentPlayBack).toBe(false);
      expect(secondRange.containsCurrentPlayBack).toBe(true);
      expect(thirdRange.containsCurrentPlayBack).toBe(false);
    });

    it(`sets the correct width and offset on each bufferedAudioRange`, () => {
      const [
        firstRange,
        secondRange,
        thirdRange
      ] = trackPlayer.bufferedAudioRanges;

      expect(firstRange.bufferedStyles).toEqual({
        left: '0%',
        width: `16.666666666666664%`
      });

      expect(secondRange.bufferedStyles).toEqual({
        left: '33.888888888888886%',
        width: '16.11111111111111%'
      });

      expect(thirdRange.bufferedStyles).toEqual({
        left: '66.66666666666666%',
        width: '16.666666666666664%'
      });
    });

    it(`sets the correct width and offset on each bufferedAudioRange's currentPlayBackStyles`, () => {
      const [
        firstRange,
        secondRange,
        thirdRange
      ] = trackPlayer.bufferedAudioRanges;

      expect(firstRange.currentPlayBackStyles).toEqual({
        left: '0%',
        width: `0%`
      });

      expect(secondRange.currentPlayBackStyles).toEqual({
        left: '33.33333333333333%',
        width: '0.5555555555555556%'
      });

      expect(thirdRange.currentPlayBackStyles).toEqual({
        left: '66.66666666666666%',
        width: '0%'
      });
    });
  });
});
