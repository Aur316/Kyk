import React, { useState } from "react";
import { Input, Radio, Checkbox } from "antd";

const Statistics: React.FC<{
  age: string;
  setAge: React.Dispatch<React.SetStateAction<string>>;
  gender: string | null;
  setGender: React.Dispatch<React.SetStateAction<string | null>>;
  consumedSubstances: string;
  setConsumedSubstances: React.Dispatch<React.SetStateAction<string>>;
  regularDrugUse: string;
  setRegularDrugUse: React.Dispatch<React.SetStateAction<string>>;
  harmReductionMeasures: string[];
  setHarmReductionMeasures: React.Dispatch<React.SetStateAction<string[]>>;
  relationshipWithDrugs: string;
  setRelationshipWithDrugs: React.Dispatch<React.SetStateAction<string>>;
  changeInDrugUsage: string;
  setChangeInDrugUsage: React.Dispatch<React.SetStateAction<string>>;
  missingServiceForHarmReduction: string;
  setMissingServiceForHarmReduction: React.Dispatch<
    React.SetStateAction<string>
  >;
}> = ({
  age,
  setAge,
  gender,
  setGender,
  consumedSubstances,
  setConsumedSubstances,
  regularDrugUse,
  setRegularDrugUse,
  harmReductionMeasures,
  setHarmReductionMeasures,
  relationshipWithDrugs,
  setRelationshipWithDrugs,
  changeInDrugUsage,
  setChangeInDrugUsage,
  missingServiceForHarmReduction,
  setMissingServiceForHarmReduction,
}) => {
  return (
    <div>
      <div>
        <br />
        <p className="mb-4 white text-center">How old are you? (e.g. 21)</p>
        <Input
          placeholder="Type here"
          className="customInput mb-4 text-black"
          style={{ width: "60%", textAlign: "center" }}
          onChange={(e) => setAge(e.target.value)}
          value={age}
        />
      </div>
      <div>
        <br />
        <p className="mb-4 white text-center">What is your gender?</p>
        <Radio.Group
          buttonStyle="solid"
          className="mb-4"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <Radio value="Male" style={{ marginRight: 16, color: "white" }}>
            Male
          </Radio>
          <Radio value="Female" style={{ color: "white" }}>
            Female
          </Radio>
          <Radio
            value="Transgender"
            style={{ marginRight: 16, color: "white" }}
          >
            Transgender
          </Radio>
          <Radio value="Non-binary" style={{ color: "white" }}>
            Non-binary
          </Radio>
          <Radio value="Other" style={{ color: "white" }}>
            Other
          </Radio>
        </Radio.Group>
      </div>
      <div>
        <br />
        <p className="mb-4 white text-center">
          What psychoactive substances have you consumed so far in life?
        </p>
        <Input
          placeholder="Type here"
          className="customInput mb-4 text-black"
          style={{ width: "60%", textAlign: "center" }}
          onChange={(e) => setConsumedSubstances(e.target.value)}
          value={consumedSubstances}
        />
      </div>
      <div>
        <br />
        <p className="mb-4 white text-center">
          Do you consume any drugs regularly? If so, which and how often (e.g.
          mushrooms every 2 weeks, weed every day)
        </p>
        <Input
          placeholder="Type here"
          className="customInput mb-4 text-black"
          style={{ width: "60%", textAlign: "center" }}
          onChange={(e) => setRegularDrugUse(e.target.value)}
          value={regularDrugUse}
        />
        <p className="mb-4 white text-center">
          What harm reduction measures do you commonly use?
        </p>
        <Checkbox.Group
          style={{ width: "100%" }}
          className="mb-4 text-white customCheckboxGroup"
          onChange={(checkedValues) =>
            setHarmReductionMeasures(checkedValues as string[])
          }
          value={harmReductionMeasures}
        >
          <div className="checkboxItem">
            <Checkbox value="Drug checking (sending to a lab)">
              Drug checking (sending to a lab)
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Drug checking (TLC)">Drug checking (TLC)</Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Drug checking (reagents)">
              <span>Drug checking (reagents)</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Not sharing sniffing instruments with others">
              <span>Not sharing sniffing instruments with others</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Not sharing needles with others">
              <span>Not sharing needles with others</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Taking a small test dose when using a substance or batch for the first time">
              <span>
                Taking a small test dose when using a substance or batch for the
                first time
              </span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Having a trip sitter">
              <span>Having a trip sitter</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Taking care of set and setting">
              <span>Taking care of set and setting</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Taking supplements to help recovery or reduce negative side-effects">
              <span>
                Taking supplements to help recovery or reduce negative
                side-effects
              </span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Asking questions in psychonaut wiki telegram group">
              <span>Asking questions in psychonaut wiki telegram group</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Reading about the substance online in other websites">
              <span>Reading about the substance online in other websites</span>
            </Checkbox>
          </div>
          <div className="checkboxItem">
            <Checkbox value="Other">
              <span>Other</span>
            </Checkbox>
          </div>
        </Checkbox.Group>
        <br />
        <p className="mb-4 white text-center">
          Do you feel you have a healthy relationship with drugs?
        </p>
        <Radio.Group
          buttonStyle="solid"
          className="mb-4"
          onChange={(e) => setRelationshipWithDrugs(e.target.value)}
          value={relationshipWithDrugs}
        >
          <Radio value="yes" style={{ marginRight: 16, color: "white" }}>
            Yes
          </Radio>
          <Radio value="more or less" style={{ color: "white" }}>
            More or less
          </Radio>
          <Radio value="no" style={{ marginRight: 16, color: "white" }}>
            No
          </Radio>
          <Radio value="No but trying to improve" style={{ color: "white" }}>
            No but trying to improve
          </Radio>
        </Radio.Group>
      </div>
      <br />
      <p className="mb-4 white text-center">
        Is there anything you want to change regarding your drug usage?
      </p>
      <Input
        placeholder="Type here"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => setChangeInDrugUsage(e.target.value)}
        value={changeInDrugUsage}
      />
      <br />
      <p className="mb-4 white text-center">
        Is there any service or tool that feel is missing for harm reduction
        worldwide?
      </p>
      <Input
        placeholder="Type here"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => setMissingServiceForHarmReduction(e.target.value)}
        value={missingServiceForHarmReduction}
      />
      <br />
    </div>
  );
};

export default Statistics;
