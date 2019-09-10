import { HLLEnvironment } from './environment.interface';

export const environment: HLLEnvironment = {
  production: true,

  API: {
    TRACKS: {
      STREAM_SINGLE_TRACK: (params: { trackId: string }) =>
        `http://localhost:8080/api/public/track/${params.trackId}/stream`,
      GET_ALL_FOR_USER: `http://localhost:8080/api/public/tracks`
    }
  }
};
