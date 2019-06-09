import { TestBed } from '@angular/core/testing';

import { TrackPlayer } from './track-player.service';

describe('TrackPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackPlayer = TestBed.get(TrackPlayer);
    expect(service).toBeTruthy();
  });
});
