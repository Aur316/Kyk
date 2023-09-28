import axios from "axios";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { ParsedUrlQuery } from "querystring";

const WEBFLOW_BASE_URL = "https://testing-22bb2e.webflow.io/warningspages/";

const WarningsPages: NextPage<{
  htmlContent: string;
  pageNotFound: boolean;
}> = ({ htmlContent, pageNotFound }) => {
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
        <div id="warnings">
          {pageNotFound ? (
            <h1>Page not yet done.... Any time though!!!</h1>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as ParsedUrlQuery;
  let slug = params.slug as string;

  // Check and perform redirection based on locale
  if (context.locale === "es-ES" && !slug.endsWith("-esp")) {
    return {
      redirect: {
        destination: `/es-ES/warningspages/${slug}-esp`,
        permanent: false,
      },
    };
  }

  if (context.locale === "en-US" && slug.endsWith("-esp")) {
    const newSlug = slug.replace("-esp", "");
    return {
      redirect: {
        destination: `/warningspages/${newSlug}`,
        permanent: false,
      },
    };
  }

  const url = `${WEBFLOW_BASE_URL}${slug}`;

  try {
    const response = await axios.get(url);

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
        pageNotFound: false,
      },
    };
  } catch (error) {
    console.error("Failed to fetch the Webflow page:", error);
    return {
      props: {
        htmlContent: "",
        pageNotFound: true,
      },
    };
  }
};

export default WarningsPages;
