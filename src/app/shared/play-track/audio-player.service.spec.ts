import { TestBed } from '@angular/core/testing';

import { AudioPlayer } from './audio-player.service';

describe('AudioPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioPlayer = TestBed.get(AudioPlayer);
    expect(service).toBeTruthy();
  });
});
