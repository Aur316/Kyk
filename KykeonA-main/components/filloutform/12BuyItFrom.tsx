import React, { useState } from "react";
import { Input, Radio } from "antd";

interface BuyItFromProps {
  onPurchaseSourceChange: (value: string) => void;
  purchaseSource: string;
  onCostChange: (value: string) => void;
  cost: string;
  onPurchaseDateChange: (value: string) => void;
  purchaseDate: string;
  onSendingCountryChange: (value: string) => void;
  sendingCountry: string;
  onAdditionalNotesChange: (value: string) => void;
  additionalNotes: string;
  onIntendedActionChange: (value: string) => void;
  intendedAction: string;
  onOtherIntendedActionChange: (value: string) => void;
  otherIntendedAction: string;
}

const BuyItFrom: React.FC<BuyItFromProps> = ({
  onPurchaseSourceChange,
  purchaseSource,
  onCostChange,
  cost,
  onPurchaseDateChange,
  purchaseDate,
  onSendingCountryChange,
  sendingCountry,
  onAdditionalNotesChange,
  additionalNotes,
  onIntendedActionChange,
  intendedAction,
  onOtherIntendedActionChange,
  otherIntendedAction,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div>
      <br />

      <p className="mb-4 white text-center">Where did you buy it from?</p>
      <Input
        placeholder='(e.g. "www.rcshopexample.com" or "t.me/telegramrcgroupexample" or "Vendor 23 @ exampledarknet.onion"). If it&#39;s a cultivated or wild plant, please write WILD/CULTIVATED.'
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => onPurchaseSourceChange(e.target.value)}
        value={purchaseSource}
      />
      <br />

      <p className="mb-4 white text-center">How much did it cost?</p>
      <Input
        placeholder="(please specify if &lsquo;per gram&rsquo; or other unit)"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => onCostChange(e.target.value)}
        value={cost}
      />
      <br />

      <p className="mb-4 white text-center">
        When did you buy or obtain the sample? (add approximate date if not
        sure)
      </p>
      <Input
        placeholder="(add approximate date if not sure)"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => onPurchaseDateChange(e.target.value)}
        value={purchaseDate}
      />
      <br />

      <p className="mb-4 white text-center">
        From which country are you sending the sample to Kykeon Analytics?
      </p>
      <Input
        placeholder="Type here"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => onSendingCountryChange(e.target.value)}
        value={sendingCountry}
      />
      <br />

      <p className="mb-4 white text-center">
        Other relevant notes about the sample (if applicable)
      </p>
      <Input
        placeholder="Type here"
        className="customInput mb-4 text-black"
        style={{ width: "60%", textAlign: "center" }}
        onChange={(e) => onAdditionalNotesChange(e.target.value)}
        value={additionalNotes}
      />
      <br />
      <p className="mb-4 white text-center">
        What will you do if your sample is found to be
        impure/adulterated/mislabeled?
      </p>
      <Radio.Group
        buttonStyle="solid"
        className="mb-4"
        onChange={(e) => {
          setSelectedOption(e.target.value);
          onIntendedActionChange(e.target.value);
        }}
        value={intendedAction}
      >
        <Radio
          value="Discard the drug regardless of impurity/adulterant"
          style={{ marginRight: 16, color: "white" }}
        >
          Discard the drug regardless of impurity/adulterant
        </Radio>
        <Radio
          value="Discard the drug only if its a dangerous adulterant"
          style={{ color: "white" }}
        >
          Discard the drug only if its a dangerous adulterant
        </Radio>
        <Radio value="Consume anyway" style={{ color: "white" }}>
          Consume anyway
        </Radio>
        <Radio value="Other" style={{ color: "white" }}>
          Other
        </Radio>
      </Radio.Group>

      {selectedOption === "Other" && (
        <Input.TextArea
          placeholder="Please specify"
          className="customInput mb-4 text-black"
          style={{
            width: "60%",
            textAlign: "center",
            alignItems: "center",
          }}
          onChange={(e) => {
            onOtherIntendedActionChange(e.target.value);
          }}
          value={otherIntendedAction}
        />
      )}
    </div>
  );
};

export default BuyItFrom;
