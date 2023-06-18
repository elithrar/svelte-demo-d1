# Example: SvelteKit + Cloudflare D1

**Note**: 🧪 This is a example application and is not officially supported by Cloudflare.

An example SvelteKit project on Cloudflare Pages (https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/) that connects to a [D1 database](https://developers.cloudflare.com/d1/).

* `svelte.config.ts` imports `import adapter from '@sveltejs/adapter-cloudflare'` instead of `adapter-auto`
* `src/app.d.ts` expands the `Platform` `interface` to the below:

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

## License

Copyright Cloudflare, Inc (2023). Apache-2.0 licensed. See the LICENSE file for details.
