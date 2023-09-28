import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import FormGroup from "../../models/FormGroup";

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Define a single form object with the provided ID
      const forms = [
        {
          name: "Simple Qualitative Analysis",
          data: {},
          _id: "64f9bf12abba6432a00a460d",
        },
      ];

      // Construct a new FormGroup with this form
      const formGroup = new FormGroup({ forms });

      // Save the FormGroup to the database
      await formGroup.save();

      // Return the saved FormGroup's ID
      res.status(200).json({ success: true, data: formGroup });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ success: false });
  }
};
