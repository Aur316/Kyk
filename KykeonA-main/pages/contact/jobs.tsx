import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { useRouter } from "next/router";
import { JobsEng } from "../../devlink";
import { JobsEsp } from "../../devlink";

const Page: NextPage = () => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Kykeon Analytics</title>
        <meta name="description" content="Hello, World!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected="contact" sticky={true} />

      <main style={{ minHeight: "70vh" }}>
        <div>
          <div id="news" className="px-8 lg:px-16 pt-8 lg:pt-16">
            <div className="font-thin text-6xl font-bold text-4xl lg:text-6xl z-20 special-text text-center">
              {locale === "en-US" ? "Job Offering" : "Oferta de trabajo"}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="w-48 border-2 border-solid border-accent-8" />
            </div>
            <br />
            <br />

            <br />
            <div className="css-reset">
              {locale === "en-US" ? <JobsEng /> : <JobsEsp />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Page;
