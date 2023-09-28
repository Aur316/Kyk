import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import FormGroup from "../../models/FormGroup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { formId } = req.query;

    try {
      const formGroup = await FormGroup.findOne({ "forms._id": formId });
      if (!formGroup) {
        return res.status(404).json({ error: "Form not found" });
      }

      const form = formGroup.forms.id(formId);
      return res.status(200).json(form.data || {});
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch form data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
