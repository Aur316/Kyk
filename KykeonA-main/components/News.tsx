import Link from "next/link";
import slugify from "slugify";

interface NewsProps {
  collections: any[];
}

const News: React.FC<NewsProps> = ({ collections }) => {
  return (
    <div id="news" className=" lg:px-16  lg:pt-16">
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="font-thin text-6xl font-bold text-4xl lg:text-6xl special-text border-text"
      >
        <h1>News</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="w-48 border-2 border-solid border-accent-8" />
      </div>
      <br />
      <br />
      <section className="lg:px-16">
        <div
          className="px-8 grid gap-4 grid-cols-1 lg:grid-cols-5"
          style={{ paddingBottom: 20 }}
        >
          {collections.map((collection, index) => (
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
                src={collection["001"]?.url}
                alt={collection.name}
                width="218"
                style={{ minHeight: "144px" }}
              />
              <Link
                href={`/newspages/${slugify(collection.slug ?? "undefined")}`}
              >
                <a
                  className="font-bold text-lg mt-2"
                  style={{ alignSelf: "flex-start" }}
                >
                  {collection.name}
                </a>
              </Link>
              <div className="mt-2 text-white">
                {collection.tldr.length > 160
                  ? collection.tldr.substring(0, 157) + "..."
                  : collection.tldr}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
