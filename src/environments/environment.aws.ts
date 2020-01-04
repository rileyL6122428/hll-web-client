import { HLLEnvironment } from './environment.interface';

const apiHost = 'ec2-52-14-189-224.us-east-2.compute.amazonaws.com:80';

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
