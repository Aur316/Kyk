import React, { useState } from "react";
import { Input, Radio } from "antd";

const Availability: React.FC<{
  onSelectionChange: (selection: string) => void;
  onPreviousServiceUsageChange: (value: string) => void;
  previousServiceValue: string;
  availabilityValue: string;
}> = ({
  onSelectionChange,
  onPreviousServiceUsageChange,
  previousServiceValue,
  availabilityValue,
}) => {
  const handleChange = (e: any) => {
    onSelectionChange(e.target.value);
  };
  return (
    <div>
      <br />

      <p className="mb-4 white text-center">
        Have you used a drug checking service before? If so, which/where?
      </p>
      <Input
        placeholder="Type here"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => onPreviousServiceUsageChange(e.target.value)}
        value={previousServiceValue}
      />
      <br />

      <p className="mb-4 white text-center">
        Would you be willing to answer questions about age/gender and drug usage
        for statistical purposes? (purely optional. Answering NO finishes the
        form. Answering YES leads to 9 more questions.)
      </p>
      <Radio.Group
        buttonStyle="solid"
        className="mb-4"
        onChange={handleChange}
        value={availabilityValue}
      >
        <Radio value="yes" style={{ marginRight: 16, color: "white" }}>
          Yes
        </Radio>
        <Radio value="no" style={{ color: "white" }}>
          No
        </Radio>
      </Radio.Group>
    </div>
  );
};
export default Availability;
