import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  return NextResponse.json({ message: "Hello World!" });
}

export { handler as GET };
