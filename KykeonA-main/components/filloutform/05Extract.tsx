import React, { useState } from "react";
import { Radio, Input, Typography, Button } from "antd";
const { Title } = Typography;

interface ExtractProps {
  ethnoDescription: string;
  setEthnoDescription: (value: string) => void;

  otherSample: string;
  setOtherSample: (value: string) => void;

  otherPart: string;
  setOtherPart: (value: string) => void;

  selectedSample: string | null;
  setSelectedSample: (value: string) => void;

  selectedPart: string | null;
  setSelectedPart: (value: string) => void;

  extractionDescription: string;
  setExtractionDescription: (value: string) => void;

  sampleOrigin: string | null;
  setSampleOrigin: (value: string) => void;
}

const Extract: React.FC<ExtractProps> = ({
  ethnoDescription,
  setEthnoDescription,

  otherSample,
  setOtherSample,

  otherPart,
  setOtherPart,

  selectedSample,
  setSelectedSample,

  selectedPart,
  setSelectedPart,

  extractionDescription,
  setExtractionDescription,

  sampleOrigin,
  setSampleOrigin,
}) => {
  return (
    <div style={{ color: "white" }}>
      <Title level={4} style={{ color: "white" }}>
        Plant/extract sample Information
      </Title>
      <Radio.Group
        onChange={(e) => {
          setSelectedSample(e.target.value);
        }}
        value={selectedSample}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Radio
          value="Brewed ayahuasca"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Brewed ayahuasca
        </Radio>
        <Radio
          value="Banisteriopsis caapi (Ayahuasca Vine, Yagé)"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Banisteriopsis caapi (Ayahuasca Vine, Yagé)
        </Radio>
        <Radio
          value="Tabernanthe iboga"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Tabernanthe iboga
        </Radio>
        <Radio
          value="Banisteriopsis muricata"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Banisteriopsis muricata
        </Radio>
        <Radio
          value="Psychotria viridis (Chacruna)"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Psychotria viridis (Chacruna)
        </Radio>
        <Radio
          value="Diplopterys cabrerana (Chaliponga, Chagropanga)"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Diplopterys cabrerana (Chaliponga, Chagropanga)
        </Radio>
        <Radio
          value="Mimosa hostilis"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Mimosa hostilis
        </Radio>
        <Radio
          value="Peganum harmala"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Peganum harmala
        </Radio>
        <Radio
          value="other"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          other
        </Radio>
      </Radio.Group>
      {selectedSample === "other" && (
        <Input
          className="customInput mb-4 text-black"
          placeholder="Specify"
          style={{
            width: "50%",
            textAlign: "center",
            margin: "0 auto",
            color: "white",
            backgroundColor: "#1f1f1f",
          }}
          onChange={(e) => setOtherSample(e.target.value)}
          value={otherSample}
        />
      )}
      <br />
      <Title level={4} style={{ color: "white" }}>
        What part of the plant is being sent to be tested (or was used to make
        the extract)?
      </Title>
      <Radio.Group
        onChange={(e) => {
          setSelectedPart(e.target.value);
        }}
        value={selectedPart}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Radio
          value="Leaves/phyllodes"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Leaves/phyllodes
        </Radio>
        <Radio
          value="Rootbark"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Rootbark
        </Radio>
        <Radio
          value="Branches"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Branches
        </Radio>
        <Radio
          value="Bark / Stembark"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Bark / Stembark
        </Radio>

        <Radio
          value="other"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          other
        </Radio>
      </Radio.Group>
      {selectedPart === "other" && (
        <Input
          className="customInput mb-4 text-black"
          placeholder="Specify"
          style={{
            width: "50%",
            margin: "0 auto",
            color: "white",
            backgroundColor: "#1f1f1f",
          }}
          onChange={(e) => setOtherPart(e.target.value)}
          value={otherPart}
        />
      )}
      <Title level={4} style={{ color: "white" }}>
        If the sample is an extract, please describe how it was extracted, if
        you know how.
      </Title>
      <Input
        className="customInput mb-4 text-black"
        placeholder="For example what method/tek was used, solvents, any other relevant extraction notes."
        style={{
          color: "white",
          backgroundColor: "#1f1f1f",
          textAlign: "center",
        }}
        onChange={(e) => setExtractionDescription(e.target.value)}
        value={extractionDescription}
      />
      <Title level={4} style={{ color: "white" }}>
        What is the origin of the sample?
      </Title>
      <Radio.Group
        value={sampleOrigin}
        onChange={(e) => setSampleOrigin(e.target.value)}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Radio
          value="Online shop"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Online shop
        </Radio>
        <Radio
          value="Local shop"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Local shop
        </Radio>
        <Radio
          value="Wild harvested"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Wild harvested
        </Radio>
        <Radio
          value="Cultivated by me or someone I know"
          style={{
            width: "30%",
            textAlign: "center",
            color: "white",
          }}
        >
          Cultivated by me or someone I know
        </Radio>
      </Radio.Group>
      <br />
      <div className="text-4xl font-bold mb-2 white">
        <Title level={4}>Ethnobotanical sample information</Title>
        <p className="mb-4 white text-center">
          Please describe if you know any details regarding conditions of growth
          and harvest (for example general area where it was grown, time of year
          of harvest, if fertilizers were used, time of year of harvest, etc)
        </p>
        <Input.TextArea
          className="customInput mb-4 text-black text-center"
          rows={4}
          onChange={(e) => setEthnoDescription(e.target.value)}
          value={ethnoDescription}
          placeholder="Describe the details here..."
        />
        <div style={{ marginTop: "20px", textAlign: "center" }}></div>
      </div>{" "}
    </div>
  );
};

export default Extract;
