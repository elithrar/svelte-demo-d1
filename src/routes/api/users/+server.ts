import type { RequestHandler } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, platform }) {
  let result = await platform.env.DB.prepare(
    "SELECT * FROM users LIMIT 5"
  ).run();
  return new Response(JSON.stringify(result));
}
