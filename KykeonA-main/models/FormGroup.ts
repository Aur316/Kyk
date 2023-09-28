import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const FormGroupSchema = new mongoose.Schema(
  {
    forms: [FormSchema],
  },
  { strict: false }
);

const FormGroup: any =
  mongoose.models.FormGroup || mongoose.model("FormGroup", FormGroupSchema);

export default FormGroup;
