import React, { useState } from "react";
import { Button, Input } from "antd";

interface ResearchChemicalProps {
  substance: string;
  setSubstance: (value: string) => void;
}

const ResearchChemical: React.FC<ResearchChemicalProps> = ({
  substance,
  setSubstance,
}) => {
  return (
    <div className="font-thin text-4xl lg:text-2xl z-20 white text-center">
      <h1 className="text-6xl font-bold mb-4 white">Sample Information</h1>
      <h2 className="text-4xl font-bold mb-2 white">
        Specify Substance (e.g. 2-FDCK, 3-FEA, etc.)
      </h2>
      <p className="mb-4 white text-center">
        Please use an unambiguous name to describe the substance, no street
        slang.
      </p>
      <Input
        className="customInput "
        placeholder="Specify the substance here"
        value={substance}
        onChange={(e) => {
          setSubstance(e.target.value);
        }}
        style={{ width: "60%", textAlign: "center" }}
      />
      <div></div>
    </div>
  );
};

export default ResearchChemical;
