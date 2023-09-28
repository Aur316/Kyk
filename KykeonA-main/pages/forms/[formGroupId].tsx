import { Select } from "antd";
import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";

import dbConnect from "../../utils/dbConnect";
import FormGroup from "../../models/FormGroup";
import FirstSection from "../../components/filloutform/03FirstSection";

const { Option } = Select;

interface FormGroupProps {
  forms: { name: string; _id: string }[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const formGroupId = context.params?.formGroupId as string;
  const formGroup = await FormGroup.findById(formGroupId);

  if (!formGroup) {
    return {
      notFound: true,
    };
  }

  // Convert Mongoose document to plain JavaScript object and select only necessary data
  const forms = formGroup.toObject().forms.map((form: any) => ({
    name: form.name,
    _id: form._id.toString(),
  }));

  return {
    props: {
      forms,
    },
  };
};

const FormGroupPage: React.FC<FormGroupProps> = ({ forms }) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSelectChange = async (
    value: string | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let selectedValue: string;

    if (typeof value === "string") {
      selectedValue = value;
    } else if (value && value.target) {
      selectedValue = value.target.value;
    } else {
      selectedValue = "";
    }

    setSelectedForm(selectedValue);

    if (selectedValue) {
      try {
        const response = await fetch(
          `/api/getFormData?formId=${selectedValue}`
        );
        if (response.ok) {
          const formData = await response.json();
          setFormData(formData);
        } else {
          console.error("Failed to fetch form data");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    } else {
      setFormData({}); //Clear the data if no form is selected.
    }
  };

  const handleSave = async () => {
    if (!selectedForm) return;
    await fetch(`/api/saveFormData?formId=${selectedForm}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div>
      <h1>Select a form</h1>
      <div className="customSelectorContainer">
        <Select
          className="customSelector"
          dropdownClassName="customDropdowner"
          placeholder="Select..."
          onChange={(value) => handleSelectChange(value)}
        >
          <Option>Select...</Option>
          {forms.map((form) => (
            <Option key={form._id} value={form._id}>
              {form.name}{" "}
            </Option>
          ))}
        </Select>
      </div>
      {selectedForm && (
        <div>
          <FirstSection selectedForm={selectedForm} formData={formData} />
          <button onClick={handleSave}>Save Data</button>
        </div>
      )}
    </div>
  );
};

export default FormGroupPage;
