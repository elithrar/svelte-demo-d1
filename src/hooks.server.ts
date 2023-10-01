import { connectD1, waitUntil } from 'wrangler-proxy';
import { dev } from '$app/environment';

export const handle = async ({ event, resolve }) => {
    // in dev mode you have to use a proxy to connect to your database
    // this is if you want to use wrangler dev with vite dev as the source.
    // https://www.npmjs.com/package/wrangler-proxy
    if (dev) {
        event.platform = {
            ...event.platform,
            env: {
                DB: connectD1('DB'),
            },
            context: {
                waitUntil: waitUntil,
            },
            // not sure what to to with caches when using proxy.
            // caches: 
        }
        // TODO: add other env vars here
    }

    return resolve(event);
};