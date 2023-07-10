import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ request, platform }) {
  let result = await platform.env.DB.prepare(
    "SELECT * FROM users LIMIT 5"
  ).run();
  return new Response(JSON.stringify(result));
}
