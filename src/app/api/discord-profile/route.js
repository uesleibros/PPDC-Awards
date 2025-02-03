export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	if (!id) {
    return new Response(
      JSON.stringify({ error: "Parâmetro 'id' não encontrado" }),
      { status: 400 }
    );
  }

  const req = await fetch(`https://dashboard.botghost.com/api/public/tools/user_lookup/${id}`, {
  	headers: {
  		"Authority": "dashboard.botghost.com",
  		"Cookie": "landing_page=/; referrer=https://www.google.com/",
  		"Upgrade-Insecure-Requests": "1",
  		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
  	}
  });

  if (req.ok) {
  	const data = await req.json();
  	const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${data.avatar}`;
    const imageResponse = await fetch(avatarUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type") || "image/png";

  	return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "CDN-Cache-Control": "public, max-age=3600"
      }
    });
  }

  return new Response(null);
}