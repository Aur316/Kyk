import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parse } from "node-html-parser";

// @ts-ignore
import en_locale from "/locales/en-US.json";
// @ts-ignore
import es_locale from "/locales/es-ES.json";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { parseStyles } from "../../utils";

const Index: NextPage<any> = ({
  en_innerHTML,
  es_innerHTML,
  en_styleInnerHTML,
  es_styleInnerHTML,
}) => {
  const locales: any = {
    "en-US": en_locale,
    "es-ES": es_locale,
  };

  const { locale } = useRouter();

  const t = locales[locale || "en-US"];

  const innerHTML = locale === "en-US" ? en_innerHTML : es_innerHTML;
  const styleInnerHTML =
    locale === "en-US" ? en_styleInnerHTML : es_styleInnerHTML;

  return (
    <>
      <Head>
        <title>Kykeon Analytics</title>
        <meta name="description" content="Kykeon Analytics" />
        <link rel="icon" href="/favicon.ico" />
        <style
          dangerouslySetInnerHTML={{ __html: parseStyles(styleInnerHTML) }}
        />
      </Head>

      <Header sticky={false} selected="services" />
      <div className="max-w-screen-xl mx-auto text-white overflow-x-hidden">
        <div className="font-bold text-2xl lg:text-5xl pt-8 lg:pt-16 px-8 lg:px-16">
          <h1 className="text-center special-text">
            {t["home_services_service_1_title"]}
          </h1>
        </div>
        <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
        <div className="px-8 lg:px-16">
          <div
            className="font-light text-xl docs-page"
            dangerouslySetInnerHTML={{ __html: innerHTML || "" }}
          />
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const en_version =
    "https://docs.google.com/document/d/e/2PACX-1vSOXJrA_LkZHoS7MB1pl0SAxTtEq6_tJQ2RTORX7gTQjEECIyPxw121INJGZabeCE3o_SspNBWJpFwc/pub?embedded=true";
  const es_version =
    "https://docs.google.com/document/d/e/2PACX-1vQsQrsBb1xTrqFB2JOXuGukJbbZPtV9cQDV1OMG83ih9_x14fUpWnnRwa1DndUi8Cq_4MWz9-YqDviZ/pub?embedded=true";

  const en_response = await fetch(en_version);
  const en_text = await en_response.text();
  const en_doc = parse(en_text);
  const en_innerHTML =
    en_doc?.querySelectorAll(".doc-content")?.toString() ?? "";
  const en_style = en_doc?.querySelectorAll("style")?.toString() ?? "";
  const en_styleDoc = parse(en_style);
  const en_styleInnerHTML =
    en_styleDoc?.querySelectorAll("style")?.toString() ?? "";

  const es_response = await fetch(es_version);
  const es_text = await es_response.text();
  const es_doc = parse(es_text);
  const es_innerHTML = es_doc?.querySelector(".doc-content")?.toString() ?? "";
  const es_style = es_doc?.querySelectorAll("style")?.toString() ?? "";

  const es_styleDoc = parse(es_style);
  const es_styleInnerHTML =
    es_styleDoc?.querySelectorAll("style")?.toString() ?? "";

  return {
    props: {
      en_innerHTML,
      es_innerHTML,
      en_styleInnerHTML,
      es_styleInnerHTML,
    },
  };
}

export default Index;
