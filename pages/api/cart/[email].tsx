// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../utils/database";
import { ObjectID } from "mongodb";
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
      name: string;
      unPrice: number;
      qty: number;
      totalProducts: number;
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
    switch (req.method) {
      case "POST": {
        const {
          itens,
          totalCart,
        }: {
          itens: [
            {
              name: string;
              unPrice: number;
              qty: number;
              totalProducts: number;
              totalPrice: number;
            }
          ];
          totalCart: number;
        } = req.body;

        response = await db.collection("cart").insertOne({
          itens,
          totalCart,
        });

        res.status(200).json(response.ops[0]);
        break;
      }
      case "DELETE": {
        const {
          _id,
        }: {
          _id: string;
        } = req.body;

        if (!_id) {
          res.status(400).json({ error: "Missing cart ID on request body" });
          return;
        }

        let id: ObjectID;

        try {
          id = new ObjectID(_id);
        } catch {
          res.status(400).json({ error: "Wrong objectID" });
          return;
        }

        response = await db.collection("cart").deleteOne({ id });

        if (!response) {
          res.status(400).json({ error: `Cart with ID ${id} not found` });
          return;
        }
        break;
      }
      default: {
        const { email } = req.query;

        if (!email) {
          res.status(400).json({ error: "Missing e-mail on request body" });
          return;
        }
        response = await db.collection("cart").findOne({ email });
        res.status(200).json(response);
        break;
      }
    }
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};
