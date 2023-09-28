import Link from "next/link";
import slugify from "slugify";

interface WarningsProps {
  warnings: any[];
}

const Warnings: React.FC<WarningsProps> = ({ warnings }) => {
  return (
    <div id="warnings" className=" lg:px-16  lg:pt-16">
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="font-thin text-6xl font-bold text-4xl lg:text-6xl "
      >
        <h1 style={{ color: "red" }}>Warnings</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", color: "red" }}>
        <div style={{ borderColor: "red" }} className="w-48 border-2 " />
      </div>
      <br />
      <br />
      <section className="lg:px-16">
        <div
          className="px-8 grid gap-4 grid-cols-1 lg:grid-cols-5"
          style={{ paddingBottom: 20 }}
        >
          {warnings.map((warning, index) => (
            <div
              key={index}
              className="floating-card"
              style={{
                maxWidth: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                className="rounded-lg mt-2 blog-image"
                src={warning["001"]?.url}
                alt={warning.name}
                width="218"
                style={{ minHeight: "144px" }}
              />
              <Link
                href={`/warningspages/${slugify(warning.slug ?? "undefined")}`}
              >
                <a
                  className="font-bold text-lg mt-2"
                  style={{ alignSelf: "flex-start" }}
                >
                  {warning.name}
                </a>
              </Link>
              <div className="mt-2 text-white">
                {warning.tldr.length > 160
                  ? warning.tldr.substring(0, 157) + "..."
                  : warning.tldr}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Warnings;
