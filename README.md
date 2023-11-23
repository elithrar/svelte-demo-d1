#  Example: SvelteKit + Cloudflare D1

## This is solved better with Miniflare
https://github.com/gerhardcit/svelte-cf-bindings-poc

**Note**: 🧪 This is a example application and is not officially supported by Cloudflare.

An example SvelteKit project on Cloudflare Pages (https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/) that connects to a [D1 database](https://developers.cloudflare.com/d1/).

There are a few things you need to do: 

1. Update `svelte.config.ts` to import `import adapter from '@sveltejs/adapter-cloudflare'` instead of `adapter-auto`
2. Update `src/app.d.ts` to expand the `Platform` `interface` to the below:

```ts
    interface Platform {
      env: {
        DB: D1Database;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: Cache
```

3. Create the Pages project by connecting it your GitHub repository: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/#deploy-with-cloudflare-pages
4. Bind your D1 database - making sure the binding name matches what you defined in `src/app.d.ts` (in this example, it's `DB`) - per https://developers.cloudflare.com/pages/platform/functions/bindings/#d1-databases

You can then re-deploy the app. The SvelteKit documentation also has a comprehensive [Cloudflare Pages](https://kit.svelte.dev/docs/adapter-cloudflare) tutorial.

## Accessing D1 from a server endpoint

Svelte's [server endpoints](https://kit.svelte.dev/docs/routing#server) allow you to define API endpoints: to access a D1 database, you want to access `platform.env.BINDING_NAME.prepare` (or other [D1 API methods](https://developers.cloudflare.com/d1/platform/client-api/)) — no different from a non-SvelteKit app.

An example server endpoint that accesses D1 at `/api/users/+server.ts` - corresponding to `https://your-app.pages.dev/api/users` resembles the following:

```ts
import type { RequestHandler } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, platform }) {
  // Matches the "DB" binding you create: make sure the names match!
  let result = await platform.env.DB.prepare(
    "SELECT * FROM users LIMIT 5"
  ).run();
  return new Response(JSON.stringify(result));
}
```

## License

Copyright Cloudflare, Inc (2023). Apache-2.0 licensed. See the LICENSE file for details.
