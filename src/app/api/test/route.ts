export async function GET(req: Request) {
  const url = req.url;
  console.log(url.split("?")[1]);
  return new Response("ok");
}
