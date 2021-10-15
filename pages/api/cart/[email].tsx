// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../utils/database";
import { getSession } from "next-auth/client";

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  email: string;
  updatedAt: string;
  itens: [
    {
      id: number;
      name: string;
      unPrice: number;
      qty: number;
      totalPrice: number;
    }
  ];
  totalCart: number;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  const { db } = await connect();
  let response;
  const session = await getSession({ req });

  if (session) {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({ error: "Missing e-mail on request body" });
      return;
    }
    response = await db.collection("cart").findOne({ email });
    res.status(200).json(response);
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};
