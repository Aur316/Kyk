import { Input } from "antd";

interface OtherProps {
  sampleDescription: string;
  setSampleDescription: (value: string) => void;
}

const Other: React.FC<OtherProps> = ({
  sampleDescription,
  setSampleDescription,
}) => {
  return (
    <div className="font-thin text-4xl lg:text-2xl z-20 text-white text-center">
      <h2 className="text-4xl font-bold mb-2 white">
        Sample being sent to test?
      </h2>
      <p className="mb-4 white text-center">
        Please use an unambiguous name to describe the sample (for example
        5-MeO-DMT), no street slang.
      </p>
      <Input
        value={sampleDescription}
        placeholder="Specify the substance here"
        onChange={(e) => setSampleDescription(e.target.value)}
        className="customInput mb-4 text-black"
        style={{ width: "70%", textAlign: "center" }}
      />
      <br />
    </div>
  );
};

export default Other;
