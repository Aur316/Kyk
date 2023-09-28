import { useState, FormEvent, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/router";
// @ts-ignore
import en_locale from "/locales/en-US.json";
// @ts-ignore
import es_locale from "/locales/es-ES.json";

const Page: NextPage = () => {
  const [name, setName] = useState("");
  const [substance, setSubstance] = useState("");
  const [description, setDescription] = useState("");
  const isButtonDisabled = !substance || !description;
  const [message, setMessage] = useState("");
  const hcaptchaRef = useRef<any>(null);
  const locales: any = {
    "en-US": en_locale,
    "es-ES": es_locale,
  };

  const { locale } = useRouter();

  const t = locales[locale || "en-US"];

  const onHCaptchaChange = (token: string) => {
    handleSubmit(token);
  };

  const handleSubmit = async (recaptchaValue: string) => {
    try {
      const response = await axios.post("/api/sendEmail", {
        name,
        substance,
        description,
        recaptchaValue,
      });
      setMessage("Message Sent Successfully");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error(error);
    }
    setName("");
    setSubstance("");
    setDescription("");
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/suggestBackground.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Head>
        <title>Kykeon Analytics</title>
        <meta name="description" content="Suggest A Vendor or Substance" />
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected="contact" sticky={true} />

      <main>
        <div className="max-w-screen-2xl mx-auto text-center ">
          <div id="news" className="px-8 lg:px-16 pt-8 lg:pt-16">
            <div className="font-thin text-6xl font-bold text-4xl lg:text-6xl z-20 special-text border-text">
              {t["suggest_title"]}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="w-48 border-2 border-solid border-accent-8" />
            </div>
            <br />
            <br />
            {message && <p style={{ color: "green" }}>{message}</p>}

            <br />

            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: 1,
                  marginRight: "45px",
                  borderRadius: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "35vh",
                  overflow: "auto",
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    color: "white",
                  }}
                >
                  {t["suggest_vendor"]}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    color: "white",
                  }}
                >
                  {t["suggest_text"]}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1em",
                    color: "white",
                    borderRadius: "5px 5px 5px 5px",
                    marginTop: "45px",
                  }}
                >
                  {t["suggest_samplesend"]}
                </p>
                <Link href="/sendsample " passHref>
                  <a style={{ textDecoration: "underline" }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.3em",
                        color: "#29aba7",
                        borderRadius: "5px 5px 5px 5px",
                        textDecoration: "none",
                      }}
                    >
                      {t["suggest_follow"]}
                    </p>
                  </a>
                </Link>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (hcaptchaRef.current) {
                    hcaptchaRef.current.execute();
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",

                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginBottom: "1em",
                    width: "15vw",
                  }}
                >
                  <input
                    type="text"
                    placeholder={
                      locale === "en-US"
                        ? "Your Name (optional)"
                        : "Tu Nombre (opcional)"
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      marginRight: "1em",
                      flex: 1,
                      color: "white",
                      fontSize: "1.1em",
                      fontWeight: "bold",
                      padding: "5px",
                      background: "rgba(0, 0, 0, 0.7)",
                    }}
                  />
                  <input
                    type="text"
                    size={
                      locale === "en-US"
                        ? "Substance/Vendor Name".length
                        : "Nombre de la Sustancia/Proveedor".length
                    }
                    placeholder={
                      locale === "en-US"
                        ? "Substance/Vendor Name"
                        : "Nombre de la Sustancia/Proveedor"
                    }
                    value={substance}
                    onChange={(e) => setSubstance(e.target.value)}
                    style={{
                      flex: 1,
                      color: "white",
                      fontSize: "1.1em",
                      fontWeight: "bold",
                      padding: "5px",
                      background: "rgba(0, 0, 0, 0.7)",
                    }}
                  />
                </div>
                <textarea
                  placeholder={
                    locale === "en-US" ? "Description" : "Descripción"
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    height: "30vh",
                    width: "37vw",
                    color: "white",
                    marginBottom: "1em",
                    borderColor: "black",
                    background: "rgba(0, 0, 0, 0.7)",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                />{" "}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <HCaptcha
                    id="test"
                    ref={hcaptchaRef}
                    size="invisible"
                    sitekey="3c14060c-ace8-4646-94d8-8f4c063a98cb"
                    onError={(error) => {
                      console.error("hCaptcha Error:", error);
                    }}
                    onVerify={onHCaptchaChange}
                  />
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    style={{
                      background: isButtonDisabled ? "#606266" : "#29aba7",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontSize: "1.2em",
                      opacity: 0.8,
                    }}
                  >
                    {locale === "en-US" ? "Send" : "Enviar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
