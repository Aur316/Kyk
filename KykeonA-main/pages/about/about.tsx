import type { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

// @ts-ignore
import en_locale from "/locales/en-US.json";
// @ts-ignore
import es_locale from "/locales/es-ES.json";

const About: NextPage = () => {
  const locales: any = {
    "en-US": en_locale,
    "es-ES": es_locale,
  };

  const { locale } = useRouter();
  const t = locales[locale || "en-US"];

  return (
    <>
      <Head>
        <title>Kykeon Analytics</title>
        <meta name="description" content="Kykeon Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected="about" sticky={true} />

      <main className=" text-white" style={{ minHeight: "80vh" }}>
        <div className="max-w-screen-2xl mx-auto  pt-32">
          <div className="px-8 lg:px-16">
            <p className="font-light text-2xl ">{t["about_into"]}</p>
          </div>
          <br />
          <div>
            <div className="bg-accent-2 special-card m-4 rounded-lg lg:m-16 h-full p-8 lg:p-16">
              <div className="text-white text-center">
                <div className="font-bold text-4xl">{t["about_nmr_title"]}</div>
                <br />
                <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
                <br />
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="lg:w-1/2 lg:p-8">
                  <p className="font-light text-xl ">
                    {t["about_nmr_description"]}
                  </p>
                </div>
                <div className="lg:w-1/2 lg:p-8">
                  <Image
                    className="rounded-lg"
                    src="/nmr.png"
                    alt="kykeon Logo"
                    width={560}
                    height={308}
                  />
                </div>
              </div>
            </div>

            <div className="bg-accent-2 special-card m-4 rounded-lg lg:m-16 h-full p-8 lg:p-16">
              <div className="text-white text-center">
                <div className="font-bold text-4xl">
                  {t["about_lcms_title"]}
                </div>
                <br />
                <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
                <br />
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="lg:w-1/2 lg:p-8">
                  <p className="font-light text-xl">
                    {t["about_lcms_description"]}
                  </p>
                </div>
                <div className="lg:w-1/2 lg:p-8">
                  <Image
                    className="rounded-lg"
                    src="/lcms.png"
                    alt="kykeon Logo"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>

            <div className="bg-accent-2 special-card m-4 rounded-lg lg:m-16 h-full p-8 lg:p-16">
              <div className="text-white text-center">
                <div className="font-bold text-4xl">
                  {t["about_ftir_title"]}
                </div>
                <br />
                <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
                <br />
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="lg:w-1/2 lg:p-8">
                  <p className="font-light text-xl">
                    {t["about_ftir_description"]}
                  </p>
                </div>
                <div className="lg:w-1/2 lg:p-8">
                  <Image
                    className="rounded-lg"
                    src="/ftir.png"
                    alt="kykeon Logo"
                    width={560}
                    height={380}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between h-full px-8 lg:px-16">
            <div className="lg:w-1/2 ">
              <div className="lg:hidden p-4 lg:p-8">
                <Image
                  src="/1.jpeg"
                  alt="kykeon Logo"
                  className="rounded-lg"
                  width={560}
                  height={380}
                />
              </div>
              <p className="font-light text-xl p-4 lg:p-8">
                {t["home_about_description"]}
              </p>
            </div>
            <div className="hidden lg:block w-1/2 p-4 lg:p-8">
              <Image
                src="/4.jpeg"
                alt="kykeon Logo"
                className="rounded-lg"
                width={560}
                height={380}
              />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className=" text-3xl text-center p-8 font-bold">
            {t["home_guidelines_title"]}
          </div>
          <div className="w-1/4 mx-auto border-2 border-solid border-accent-5" />
          <p className="font-light text-xl p-8 lg:p-16">
            {t["home_guidelines_description"]}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;
