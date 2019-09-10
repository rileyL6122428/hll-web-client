export interface HLLEnvironment {
  production: boolean;

  API: {
    TRACKS: {
      STREAM_SINGLE_TRACK: (params: { trackId: string }) => string;
      GET_ALL_FOR_USER: string;
    };
  };
}
