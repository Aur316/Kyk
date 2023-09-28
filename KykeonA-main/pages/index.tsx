import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import Image from "next/image";
import { fetchCollections } from "./api/fetchWebflow";
import Link from "next/link";
import News from "../components/News";
import Warnings from "../components/Warnings";
import { fetchWarnings } from "./api/fetchWarnings";
import { useRouter } from "next/router";

// @ts-ignore
import en_locale from "/locales/en-US.json";
// @ts-ignore
import es_locale from "/locales/es-ES.json";
import { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { Background } from "../components/background";

const Home: NextPage = ({ collections, warnings }: any) => {
  const locales: any = {
    "en-US": en_locale,
    "es-ES": es_locale,
  };

  const { locale } = useRouter();
  const t = locales[locale || "en-US"];
  const activeCollections = collections[locale || "en-US"]; // Get the appropriate collection
  const activeWarnings = warnings[locale || "en-US"]; // Get the appropriate collection

  const [selectedNav, setSelectedNav] = useState<
    "about" | "home" | "services" | "news" | "contact" | "warnings"
  >("home");
  const home_ref = useRef<HTMLDivElement>(null);
  const news_ref = useRef<HTMLDivElement>(null);
  const warnings_ref = useRef<HTMLDivElement>(null);
  const services_ref = useRef<HTMLDivElement>(null);
  const contact_ref = useRef<HTMLDivElement>(null);
  const about_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (home_ref.current) {
        const rect = home_ref.current.getBoundingClientRect();
        const home_visible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (home_visible) {
          setSelectedNav("home");

          return;
        }
      }

      if (services_ref.current) {
        const rect = services_ref.current.getBoundingClientRect();
        const services_visible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (services_visible) {
          setSelectedNav("services");

          return;
        }
      }

      if (news_ref.current) {
        const rect = news_ref.current.getBoundingClientRect();
        const news_visible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (news_visible) {
          setSelectedNav("news");

          return;
        }
      }

      if (warnings_ref.current) {
        const rect = warnings_ref.current.getBoundingClientRect();
        const warnings_visible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (warnings_visible) {
          setSelectedNav("warnings");

          return;
        }
      }

      if (about_ref.current) {
        const rect = about_ref.current.getBoundingClientRect();
        const about_visible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (about_visible) {
          setSelectedNav("about");

          return;
        }
      }

      if (contact_ref.current) {
        const rect = contact_ref.current.getBoundingClientRect();
        const contact_visible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (contact_visible) {
          setSelectedNav("contact");

          return;
        }
      }
    };

    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ParallaxProvider>
      <Head>
        <title>Kykeon Analytics</title>
        <meta name="description" content="Kykeon Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected={selectedNav} sticky={true} />

      <main
        className="text-white overflow-hidden"
        style={{
          minHeight: "80vh",
        }}
      >
        <Background />
        <div className="max-w-screen-2xl mx-auto">
          {/*<div ref={home_ref} className='text-center font-bold text-4xl lg:text-6xl  z-20'>*/}
          {/*    {t["home_intro_title"]}*/}
          {/*</div>*/}
          <div
            id="home"
            className="flex flex-col lg:flex-row items-between justify-start"
          >
            {" "}
            <div className="px-8 lg:pr-0 lg:w-1/2 mb-4 lg:mb-16 flex flex-col items-start justify-center">
              <div>
                <div
                  ref={home_ref}
                  className="font-bold text-4xl lg:text-6xl z-20 special-text"
                >
                  {t["home_intro_title"]}
                </div>
                <br />
                <div className="w-48 border-2 border-solid border-accent-8 z-20 mb-8 lg:mb-16" />
              </div>
              <p className="font-light text-2xl z-20">
                {t["home_intro_description"]}
              </p>
              <div className="flex flex-col lg:flex-row justify-center mx-auto">
                <Link href="/results">
                  <div className="special-btn w-64 mx-4 text-center px-8 py-4 my-4  text-white font-bold transition-all duration-75 ease-in hover:bg-accent-9 cursor-pointer text-xl shadow-xl rounded-lg uppercase font-bold">
                    {t["nav_results"]}
                  </div>
                </Link>
                <Link href="/#warnings">
                  <div className="bg-accent-7 w-64 mx-4 text-center px-8 py-4 my-4  text-white font-bold transition-all duration-75 ease-in  cursor-pointer text-xl shadow-xl rounded-lg uppercase font-bold">
                    {t["nav_warnings"]}
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <Image
                className="rounded-lg z-20"
                src="/lab.png"
                alt="kykeon Logo"
                width={1080}
                height={1080}
              />
            </div>
          </div>

          <div id="services" className="pl-8">
            <div
              ref={services_ref}
              className="font-bold capitalize font-hairline text-4xl lg:text-6xl pt-32 z-20 special-text"
            >
              {t["home_services_title"]}
            </div>
            <br />
            <div className="w-48 border-2 border-solid border-accent-8 z-20" />
          </div>
          <br />
          <div className="grid  grid-cols-1 lg:grid-cols-3">
            <Parallax translateY={[-3, 3]}>
              <div className="bg-accent-2 special-card m-4 rounded-lg h-full py-8 px-4 relative z-20">
                <div className="text-white text-center">
                  <div className="font-bold text-xl lg:text-3xl text-center">
                    {t["home_services_service_1_title"]}
                  </div>
                  <br />
                  <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
                </div>
                <div className="" style={{ height: "fit-content" }}>
                  <div className="lg:p-4">
                    <Image
                      className="rounded-lg"
                      src="/s3.png"
                      alt="kykeon Logo"
                      width={708}
                      height={472}
                    />
                  </div>
                  <div className="lg:p-4">
                    <p
                      className="font-light text-xl"
                      dangerouslySetInnerHTML={{
                        __html: t["home_services_service_1_description"],
                      }}
                    />
                  </div>
                </div>
              </div>
            </Parallax>

            <Parallax translateY={[-5, 5]}>
              <div className="bg-accent-2 special-card m-4 rounded-lg h-full py-8 px-4 relative z-20">
                <div className="text-white text-center">
                  <div className="font-bold text-xl lg:text-3xl text-center ">
                    {t["home_services_service_2_title"]}
                  </div>
                  <br />
                  <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
                </div>
                <div className="" style={{ height: "fit-content" }}>
                  <div className="lg:p-4">
                    <Image
                      className="rounded-lg"
                      src="/s1.png"
                      alt="kykeon Logo"
                      width={708}
                      height={472}
                    />
                  </div>
                  <div className="lg:p-4">
                    <p
                      className="font-light text-xl"
                      dangerouslySetInnerHTML={{
                        __html: t["home_services_service_2_description"],
                      }}
                    />
                  </div>
                </div>
              </div>
            </Parallax>

            <Parallax translateY={[-3, 3]}>
              <div className="bg-accent-2 special-card m-4 rounded-lg h-full py-8 px-4 relative z-20">
                <div className="text-white text-center">
                  <div className="font-bold text-xl lg:text-3xl text-center ">
                    {t["home_services_service_3_title"]}
                  </div>
                  <br />
                  <div className="w-48 border-2 border-solid border-accent-8 mx-auto" />
                  <br />
                </div>
                <div className="" style={{ height: "fit-content" }}>
                  <div className="lg:p-4">
                    <Image
                      className="rounded-lg"
                      src="/s2.png"
                      alt="kykeon Logo"
                      width={708}
                      height={472}
                    />
                  </div>
                  <div className="lg:p-4">
                    <p
                      className="font-light text-xl"
                      dangerouslySetInnerHTML={{
                        __html: t["home_services_service_3_description"],
                      }}
                    />
                  </div>
                </div>
              </div>
            </Parallax>
          </div>
          <Warnings warnings={activeWarnings} />
          <News collections={activeCollections} />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </main>

      <Footer />
    </ParallaxProvider>
  );
};

export async function getStaticProps() {
  const englishCollections = await fetchCollections("en-US");
  const spanishCollections = await fetchCollections("es-ES");
  const englishWarnings = await fetchWarnings("en-US");
  const spanishWarnings = await fetchWarnings("es-ES");

  return {
    props: {
      collections: {
        "en-US": englishCollections ?? [],
        "es-ES": spanishCollections ?? [],
      },
      warnings: {
        "en-US": englishWarnings ?? [],
        "es-ES": spanishWarnings ?? [],
      },
    },
    revalidate: 60,
  };
}
export default Home;
