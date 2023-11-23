import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ request, platform }) {
  // double check this, in production of course this should be set
  if (!platform) {
    return new Response("No platform found", { status: 500, statusText: "No platform found" });
  }
  
  const db = platform.env.DB;
  try {
    // make sure you have a users table created in your database
    let result = await db.prepare(
      "SELECT * FROM users LIMIT 5"
      ).run();
      // console.log('result', result);
      return new Response(JSON.stringify(result.results));
    }
    catch (e) {
      console.log(e);
      return new Response("Error", { status: 500, statusText: "Error" });
    }
}
