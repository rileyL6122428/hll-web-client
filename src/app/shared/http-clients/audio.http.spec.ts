import { TestBed } from '@angular/core/testing';

import { AudioHttpClient } from './audio.http';

describe('AudioHttpClient', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioHttpClient = TestBed.get(AudioHttpClient);
    expect(service).toBeTruthy();
  });
});
