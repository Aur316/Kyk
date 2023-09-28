import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import FormGroup from "../../models/FormGroup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { formId, formData } = req.body;

    try {
      // Find the FormGroup containing the form
      const formGroup = await FormGroup.findOne({ "forms._id": formId });

      if (!formGroup) {
        return res.status(404).json({ error: "Form not found" });
      }

      // Update the data field for the specific form
      const form = formGroup.forms.id(formId);
      form.data = formData;

      await formGroup.save();

      return res.status(200).json({ message: "Form data saved successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save form data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
