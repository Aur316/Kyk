import React, { useState, useEffect } from "react";
import { Select } from "antd";
import Extract from "./05Extract";
import Other from "./07Other";
import ResearchChemical from "./04ResearchChemical";
import Presentation from "./0809Presentation";
import Adulteration from "./1011Adulteration";
import BuyItFrom from "./12BuyItFrom";
import Availability from "./13Availability";
import Statistics from "./14Statistics";

const { Option } = Select;

interface FirstSectionProps {
  selectedForm: string;
  formData: any;
}

const FirstSection: React.FC<FirstSectionProps> = ({
  selectedForm,
  formData,
}) => {
  const [sampleDescription, setSampleDescription] = useState<string>("");
  const [otherSample, setOtherSample] = useState<string>("");

  const [section, setSection] = useState<string | null>(null);

  const [showStatistics, setShowStatistics] = useState(false);
  const [substance, setSubstance] = useState<string>("");
  const [otherPart, setOtherPart] = useState<string>("");
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [extractionDescription, setExtractionDescription] =
    useState<string>("");
  const [sampleOrigin, setSampleOrigin] = useState<string | null>(null);
  const [ethnoDescription, setEthnoDescription] = useState<string>("");
  const [description, setDescription] = useState("");
  const [adulterationExpectation, setAdulterationExpectation] = useState("");
  const [adulterationDetails, setAdulterationDetails] = useState("");
  const [consumptionStatus, setConsumptionStatus] = useState("");
  const [effects, setEffects] = useState("");
  const [purchaseSource, setPurchaseSource] = useState("");
  const [cost, setCost] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [sendingCountry, setSendingCountry] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [intendedAction, setIntendedAction] = useState("");
  const [otherIntendedAction, setOtherIntendedAction] = useState("");
  const [previousServiceUsage, setPreviousServiceUsage] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [consumedSubstances, setConsumedSubstances] = useState("");
  const [regularDrugUse, setRegularDrugUse] = useState("");
  const [harmReductionMeasures, setHarmReductionMeasures] = useState<string[]>(
    []
  );
  const [relationshipWithDrugs, setRelationshipWithDrugs] =
    useState<string>("");
  const [changeInDrugUsage, setChangeInDrugUsage] = useState<string>("");
  const [missingServiceForHarmReduction, setMissingServiceForHarmReduction] =
    useState<string>("");
  const [willingToPayForTesting, setWillingToPayForTesting] =
    useState<string>("");
  useEffect(() => {
    setSampleDescription(formData.sampleDescription || "");
    setSection(formData.section || null);
    setOtherSample(formData.otherSample || "");
    setShowStatistics(formData.showStatistics || false);
    setSubstance(formData.substance || "");
    setOtherPart(formData.otherPart || "");
    setSelectedSample(formData.selectedSample || null);
    setSelectedPart(formData.selectedPart || null);
    setExtractionDescription(formData.extractionDescription || "");
    setSampleOrigin(formData.sampleOrigin || null);
    setEthnoDescription(formData.ethnoDescription || "");
    setDescription(formData.description || "");
    setAdulterationExpectation(formData.adulterationExpectation || "");
    setAdulterationDetails(formData.adulterationDetails || "");
    setConsumptionStatus(formData.consumptionStatus || "");
    setEffects(formData.effects || "");
    setPurchaseSource(formData.purchaseSource || "");
    setCost(formData.cost || "");
    setPurchaseDate(formData.purchaseDate || "");
    setSendingCountry(formData.sendingCountry || "");
    setAdditionalNotes(formData.additionalNotes || "");
    setIntendedAction(formData.intendedAction || "");
    setOtherIntendedAction(formData.otherIntendedAction || "");
    setPreviousServiceUsage(formData.previousServiceUsage || "");
    setAge(formData.age || "");
    setGender(formData.gender || null);
    setConsumedSubstances(formData.consumedSubstances || "");
    setRegularDrugUse(formData.regularDrugUse || "");
    setHarmReductionMeasures(formData.harmReductionMeasures || []);
    setRelationshipWithDrugs(formData.relationshipWithDrugs || "");
    setChangeInDrugUsage(formData.changeInDrugUsage || "");
    setMissingServiceForHarmReduction(
      formData.missingServiceForHarmReduction || ""
    );
    setWillingToPayForTesting(formData.willingToPayForTesting || "");
  }, [formData]);
  const gatherAllData = () => {
    return {
      sampleDescription,
      section,
      showStatistics,
      substance,
      otherSample,
      otherPart,
      selectedSample,
      selectedPart,
      extractionDescription,
      sampleOrigin,
      ethnoDescription,
      description,
      adulterationExpectation,
      adulterationDetails,
      consumptionStatus,
      effects,
      purchaseSource,
      cost,
      purchaseDate,
      sendingCountry,
      additionalNotes,
      intendedAction,
      otherIntendedAction,
      previousServiceUsage,
      age,
      gender,
      consumedSubstances,
      regularDrugUse,
      harmReductionMeasures,
      relationshipWithDrugs,
      changeInDrugUsage,
      missingServiceForHarmReduction,
      willingToPayForTesting,
    };
  };
  const saveFormData = async () => {
    const allData = gatherAllData();

    try {
      const response = await fetch("/api/saveFormData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: selectedForm,
          formData: allData,
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
      } else {
        console.error("Error:", responseData.error); // Handle errors
      }
    } catch (error) {
      console.error("Failed to save data:", error); // Handle errors
    }
  };

  const handleConsumptionStatusChange = (value: string) => {
    setConsumptionStatus(value);
  };

  const handleEffectsChange = (value: string) => {
    setEffects(value);
  };

  const handleAvailabilitySelectionChange = (selection: string) => {
    setShowStatistics(selection === "yes");
  };

  const handleChange = (value: string) => {
    setSection(value);
  };

  return (
    <div className="font-thin text-6xl font-bold text-4xl lg:text-2xl z-20 text-white text-center">
      <div className="text-white font-bold mb-2">
        Select one from: Research Chemical, Extracts, Plants, Others
      </div>
      <Select
        className="customSelect"
        dropdownClassName="customDropdown"
        placeholder="Select an option"
        onChange={handleChange}
      >
        <Option value="1">
          Research Chemical, NPS, Synthetic substances, classic drugs
        </Option>
        <Option value="2">
          Extracts (Brews like ayahuasca, Salvia extracts, DMT, mescaline etc)
        </Option>
        <Option value="3">
          Plants (not-extracted, whole or shredded/powdered plant parts)
        </Option>
        <Option value="4">Other</Option>
      </Select>
      {section === "1" && (
        <ResearchChemical substance={substance} setSubstance={setSubstance} />
      )}
      {section === "2" && (
        <Extract
          ethnoDescription={ethnoDescription}
          setEthnoDescription={setEthnoDescription}
          otherSample={otherSample}
          setOtherSample={setOtherSample}
          otherPart={otherPart}
          setOtherPart={setOtherPart}
          selectedSample={selectedSample}
          setSelectedSample={setSelectedSample}
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          extractionDescription={extractionDescription}
          setExtractionDescription={setExtractionDescription}
          sampleOrigin={sampleOrigin}
          setSampleOrigin={setSampleOrigin}
        />
      )}
      {section === "3" && (
        <Extract
          ethnoDescription={ethnoDescription}
          setEthnoDescription={setEthnoDescription}
          otherSample={otherSample}
          setOtherSample={setOtherSample}
          otherPart={otherPart}
          setOtherPart={setOtherPart}
          selectedSample={selectedSample}
          setSelectedSample={setSelectedSample}
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          extractionDescription={extractionDescription}
          setExtractionDescription={setExtractionDescription}
          sampleOrigin={sampleOrigin}
          setSampleOrigin={setSampleOrigin}
        />
      )}
      {section === "4" && (
        <Other
          setSampleDescription={setSampleDescription}
          sampleDescription={sampleDescription}
        />
      )}
      <Presentation
        onDescriptionChange={setDescription}
        description={description}
        onAdulterationExpectationChange={setAdulterationExpectation}
        adulterationExpectation={adulterationExpectation}
        onAdulterationDetailsChange={setAdulterationDetails}
        adulterationDetails={adulterationDetails}
      />
      <Adulteration
        consumptionStatusChange={consumptionStatus}
        onConsumptionStatusChange={handleConsumptionStatusChange}
        onEffectsChange={handleEffectsChange}
        effects={effects}
      />
      <BuyItFrom
        onPurchaseSourceChange={setPurchaseSource}
        purchaseSource={purchaseSource}
        onCostChange={setCost}
        cost={cost}
        onPurchaseDateChange={setPurchaseDate}
        purchaseDate={purchaseDate}
        onSendingCountryChange={setSendingCountry}
        sendingCountry={sendingCountry}
        onAdditionalNotesChange={setAdditionalNotes}
        additionalNotes={additionalNotes}
        onIntendedActionChange={setIntendedAction}
        intendedAction={intendedAction}
        onOtherIntendedActionChange={setOtherIntendedAction}
        otherIntendedAction={otherIntendedAction}
      />{" "}
      <Availability
        onSelectionChange={handleAvailabilitySelectionChange}
        onPreviousServiceUsageChange={setPreviousServiceUsage}
        previousServiceValue={previousServiceUsage}
        availabilityValue={showStatistics ? "yes" : "no"}
      />
      {showStatistics && (
        <Statistics
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          consumedSubstances={consumedSubstances}
          setConsumedSubstances={setConsumedSubstances}
          regularDrugUse={regularDrugUse}
          setRegularDrugUse={setRegularDrugUse}
          harmReductionMeasures={harmReductionMeasures}
          setHarmReductionMeasures={setHarmReductionMeasures}
          relationshipWithDrugs={relationshipWithDrugs}
          setRelationshipWithDrugs={setRelationshipWithDrugs}
          changeInDrugUsage={changeInDrugUsage}
          setChangeInDrugUsage={setChangeInDrugUsage}
          missingServiceForHarmReduction={missingServiceForHarmReduction}
          setMissingServiceForHarmReduction={setMissingServiceForHarmReduction}
        />
      )}
      <div className="parent-element">
        <button className="Btn" onClick={saveFormData} />
      </div>
    </div>
  );
};

export default FirstSection;
