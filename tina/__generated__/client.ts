import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: 'C:/Users/peter/AppData/Local/Temp/simonbacon-astro/tina/__generated__/.cache/1775101445022', url: 'http://localhost:4001/graphql', token: 'dummy', queries,  });
export default client;
  