import React, { useState } from "react";
import { Radio, Button } from "antd";
import { useRouter } from "next/router";

const Disclaimer: React.FC = () => {
  const [acknowledgement, setAcknowledgement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = () => {
    if (acknowledgement === "no") {
      setError("Cannot continue without accepting the terms and conditions!");
    } else if (acknowledgement === "yes") {
      setError(null);

      const formId = localStorage.getItem("formURL");

      if (formId) {
        router.push(`/forms/${formId}`);
      } else {
        console.error("Form ID not found in local storage");
      }
    }
  };

  return (
    <div
      className="text-center"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ flex: 1, marginRight: "1rem", color: "white" }}>
        <h2 style={{ color: "white" }} className="text-2xl bold-text">
          RC/NPS and Ethnobotanical Sample Analysis Service Disclaimer
        </h2>
      </div>
      <br />{" "}
      <div
        style={{
          flex: 1,
          marginLeft: "1rem",
          color: "white",
          maxWidth: "70%",
        }}
      >
        <p style={{ color: "white" }}>
          The analytical service, qualitative (identification) and quantitative
          (purity) results, are purely for research purposes. Even if the result
          indicates a pure substance, Kykeon Analytics Ltd. does not guarantee
          that the substance is safe for human consumption! All samples Kykeon
          Analytics Ltd. analyses are assumed for research purposes only and not
          for human consumption. Kykeon Analytics Ltd. assumes no liability for
          the results or for any actions taken on the part of the service
          recipient. Results are given without guarantee of correctness. By
          filling this form you agree to the following terms and conditions: In
          accordance with the provisions of the current regulations on
          Protection of Personal Data LOPDGDD, RGPD and LSSICE 34/2002, we
          inform you that your data will be incorporated into a data processing
          system owned by Kykeon Analytics LTD in order to be able to attend the
          commitments derived from the relationship we maintain with you, as
          well as to send you periodic information about our products or
          services by email or by any other equivalent means. Your data will not
          be transferred to third parties except in the permitted cases, being
          treated with the utmost confidentiality and kept for the period
          strictly necessary to comply with current legislation and the
          indicated purposes. The legitimacy for the processing of your data is
          based on your own consent. We inform you that you may revoke the
          consent given to the receipt of commercial communications at any time
          by sending an email to the email address:
          protecciondedatos@kykeonanalytics.com You may exercise your rights of
          access, rectification, limitation of treatment, deletion and
          opposition directing your request to:
          protecciondedatos@kykeonanalytics.com, as well as addressing the
          Competent Control Authority (SPANISH DATA PROTECTION AGENCY)
          www.aepd.es to present the claim you deem appropriate.
        </p>{" "}
      </div>
      <ul
        className="white-dot"
        style={{ textAlign: "left", maxWidth: "80vw", marginTop: "1rem" }}
      >
        <li>
          I guarantee that I will be the final user of the analysis report given
          by Kykeon Analytics LTD
        </li>
        <li>
          I undertake NOT to change, modify, amend, forge or make any alteration
          in the original analysis report delivered by Kykeon Analytics LTD
        </li>
        <li>
          I undertake that I will not use the analysis report given by Kykeon
          Analytics LTD as a guarantee or publicity of quality of any vendor or
          product. Kykeon Analytics LTD declines all responsibility in this
          sense.
        </li>
        <li>
          I undertake that I will not use the analysis report given by Kykeon
          Analytics LTD for defense purposes in any kind of proceeding without
          the express consent of Kykeon Analytics LTD.
        </li>
        <li>
          I undertake that I will keep the analysis report confidential and not
          to divulge the contents for marketing purposes.
        </li>
        <li>
          I undertake to keep Kykeon Analytics harmless and indemnified against
          any adverse consequences arising out of any misuse of the analysis
          report given by Kykeon Analytics LTD
        </li>
        <li>
          I give my consent to Kykeon Analytics LTD to use my personal data as
          below
        </li>
      </ul>
      <br />
      <br />
      <p style={{ color: "white", textDecoration: "underline" }}>
        I have read the disclaimer and acknowledge it and accept the terms and
        conditions as well as the data protection policy
      </p>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Radio.Group
        onChange={(e) => setAcknowledgement(e.target.value)}
        value={acknowledgement}
        style={{ color: "white" }}
      >
        <Radio value="yes" style={{ color: "white" }}>
          Yes
        </Radio>
        <Radio value="no" style={{ color: "white" }}>
          No
        </Radio>
      </Radio.Group>
      <br />
      <br />
      <br />
      <Button
        style={{ color: "black", background: "white" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <br />
    </div>
  );
};

export default Disclaimer;
