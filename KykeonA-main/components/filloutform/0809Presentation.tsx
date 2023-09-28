import React from "react";
import { Input, Radio } from "antd";

interface PresentationProps {
  onDescriptionChange: (value: string) => void;
  description: string;
  onAdulterationExpectationChange: (value: string) => void;
  adulterationExpectation: string;
  onAdulterationDetailsChange: (value: string) => void;
  adulterationDetails: string;
}

const Presentation: React.FC<PresentationProps> = ({
  onDescriptionChange,
  description,
  onAdulterationExpectationChange,
  adulterationExpectation,
  onAdulterationDetailsChange,
  adulterationDetails,
}) => {
  const [localAdulterationExpectation, setLocalAdulterationExpectation] =
    React.useState(adulterationExpectation);

  return (
    <div>
      <br />
      <h2 className="text-4xl font-bold mb-2 white">
        Please describe color and form
      </h2>
      <p className="mb-4 white text-center">
        For example: &quot;White powder&quot; or &quot;Blue square pill with
        computer logo&quot;
      </p>
      <Input
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Describe here"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
      />
      <p className="text-1xl font-bold mb-2 white text-center">
        Do you expect your sample to be adulterated?
      </p>
      <Radio.Group
        value={adulterationExpectation}
        onChange={(e) => {
          setLocalAdulterationExpectation(e.target.value);
          onAdulterationExpectationChange(e.target.value);
        }}
        buttonStyle="solid"
        className="mb-4 customRadioStyle"
      >
        <Radio value="yes" style={{ marginRight: 16, color: "white" }}>
          Yes
        </Radio>
        <Radio value="no" style={{ color: "white" }}>
          No
        </Radio>
      </Radio.Group>
      {adulterationExpectation === "yes" && (
        <div>
          <br />
          <p className="mb-4 white text-center">
            What Adulterations do you expect?
          </p>
          <Input
            value={adulterationDetails}
            onChange={(e) => onAdulterationDetailsChange(e.target.value)}
            placeholder="Type here"
            className="customInput mb-4 text-black"
            style={{ width: "60%", textAlign: "center" }}
          />
        </div>
      )}
    </div>
  );
};

export default Presentation;
