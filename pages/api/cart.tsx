// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";
/* import { ObjectID } from "mongodb"; */
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
          email,
          updatedAt,
          itens,
          totalCart,
        }: {
          email: string;
          updatedAt: string;
          itens: {
            unPrice: number;
            qty: number;
            totalPrice: number;
          };
          totalCart: number;
        } = req.body;

        const existCartUser = await db.collection("cart").findOne({ email });

        if (existCartUser) {
          await db.collection("cart").updateOne(
            { email: email },
            {
              $set: {
                itens: itens,
                updatedAt: updatedAt,
                totalCart: totalCart,
              },
            }
          );

          res.status(200).json(response);
          break;
        } else {
          await db.collection("cart").insertOne({
            email,
            updatedAt,
            itens,
            totalCart,
          });

          res.status(200).json(response);
          break;
        }
      }
      case "DELETE": {
        /*  const {
          id,
          email,
        }: {
          id: number;
          email: string;
        } = req.body; */

        /* const {
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
        } */
        break;
      }
      default:
        break;
    }
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};
