import { createReactClient, studioProvider } from '@livepeer/react';
import { LIVEPEER_KEY } from "../constants";

const LivePeerClient = createReactClient({
  provider: studioProvider({
    apiKey: LIVEPEER_KEY!
  }),
});

export default LivePeerClient;
