import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { brandName } = req.body;

  if (!brandName) {
    return res.status(400).json({ error: "Brand name required" });
  }

  return res.status(200).json({
    logoUrl: `https://dummyimage.com/600x300/000/fff&text=${encodeURIComponent(brandName)}`
  });
}
