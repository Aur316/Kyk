import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import FormGroup from "../../models/FormGroup";

dbConnect();

interface CartItem {
  name: string;
  quantity: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const forms: { name: string; data: object }[] = [];
      const cart: CartItem[] = req.body.cart;

      cart.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          forms.push({ name: item.name, data: {} });
        }
      });

      const formGroup = new FormGroup({ forms });
      await formGroup.save();

      res.status(200).json({ success: true, data: formGroup });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ success: false });
  }
};
