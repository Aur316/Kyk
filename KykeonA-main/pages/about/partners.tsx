import axios from "axios";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { useRouter } from "next/router";

const Partners: NextPage<{ htmlContent: string }> = ({ htmlContent }) => {
  const { locale } = useRouter();
  const title =
    locale === "es-ES"
      ? "Kykeon Analytics - Socios"
      : "Kykeon Analytics - Partners";
  const description = locale === "es-ES" ? "Nuestros Socios" : "Our Partners";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected="about" sticky={true} />

      <main style={{ minHeight: "70vh" }}>
        <div id="partners">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || "en-US";
  const slug = locale === "es-ES" ? "partners-esp" : "partners";
  const WEBFLOW_PARTNERS_URL = `https://testing-22bb2e.webflow.io/main-website-pages/${slug}`;

  try {
    const response = await axios.get(WEBFLOW_PARTNERS_URL);

    // Add inline styles to hide the Webflow badge
    const modifiedContent = `
      <style>
        a.w-webflow-badge {
          display: none !important;
        }
      </style>
      ${response.data}
    `;

    return {
      props: {
        htmlContent: modifiedContent,
      },
    };
  } catch (error) {
    console.error("Failed to fetch the Webflow page:", error);
    // Returning an empty string as htmlContent if the fetch fails
    return {
      props: {
        htmlContent: "",
      },
    };
  }
};

export default Partners;
