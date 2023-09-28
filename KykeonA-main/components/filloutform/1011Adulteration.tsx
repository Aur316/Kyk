import React, { useState } from "react";
import { Input, Radio } from "antd";

interface AdulterationProps {
  consumptionStatusChange: string;
  onConsumptionStatusChange: (value: string) => void;
  onEffectsChange: (value: string) => void;
  effects: string;
}

const Adulteration: React.FC<AdulterationProps> = ({
  consumptionStatusChange,
  onConsumptionStatusChange,
  onEffectsChange,
  effects,
}) => {
  const [consumptionStatus, setConsumptionStatus] = useState("");

  return (
    <div>
      <div>
        <br />
        <p className="mb-4 white text-center">
          Did you or somebody you know already consume this particular batch?
        </p>
        <Radio.Group
          value={consumptionStatusChange}
          onChange={(e) => {
            setConsumptionStatus(e.target.value);
            onConsumptionStatusChange(e.target.value);
          }}
          buttonStyle="solid"
          className="mb-4"
        >
          <Radio value="yes" style={{ marginRight: 16, color: "white" }}>
            Yes
          </Radio>
          <Radio value="no" style={{ color: "white" }}>
            No
          </Radio>
        </Radio.Group>
      </div>
      {consumptionStatus === "yes" && (
        <div>
          <br />
          <p className="mb-4 white text-center">What were the effects?</p>
          <Input
            onChange={(e) => {
              onEffectsChange(e.target.value);
            }}
            value={effects}
            placeholder="(please detail dosages, mode of preparation and consumption, desire/ non desired effects, etc.)"
            className="customInput mb-4 text-black"
            style={{ width: "60%", textAlign: "center" }}
          />
        </div>
      )}
    </div>
  );
};

export default Adulteration;
