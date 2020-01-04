import { HLLEnvironment } from './environment.interface';

const apiHost = 'localhost:8080';

export const environment: HLLEnvironment = {
  production: true,

  apiHost,

  API: {
    TRACKS: {
      STREAM_SINGLE_TRACK: (params: { trackId: string }) =>
        `http://${apiHost}/api/public/track/${params.trackId}/stream`,
      GET_ALL_FOR_USER: `http://${apiHost}/api/public/tracks`
    }
  }
};
