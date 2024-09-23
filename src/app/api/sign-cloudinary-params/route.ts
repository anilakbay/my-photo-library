import { v2 as cloudinary } from "cloudinary";

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  if (!paramsToSign)
    return new Response("Missing parameters to sign", { status: 400 });

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return new Response(JSON.stringify({ signature }), { status: 200 });
}
