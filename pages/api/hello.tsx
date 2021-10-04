// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  name: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  res.status(200).json({ name: "John Doe" });
};
