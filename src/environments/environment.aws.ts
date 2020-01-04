import { HLLEnvironment } from './environment.interface';
import { hllApiHost } from './aws-hosts';

const apiHost = `${hllApiHost}:80`;

export const environment: HLLEnvironment = {
  production: false,

  apiHost,

  API: {
    TRACKS: {
      STREAM_SINGLE_TRACK: (params: { trackId: string }) =>
        `http://${apiHost}/api/public/track/${params.trackId}/stream`,
      GET_ALL_FOR_USER: `http://${apiHost}/api/public/tracks`
    }
  }
};
