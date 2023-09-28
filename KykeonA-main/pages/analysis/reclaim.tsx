import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { Radio, Input, Typography, Button } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Reclaim: NextPage<{}> = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.get("/api/getCodes");
      const codes = response.data.map((item: any) => item.code);
      if (codes.includes(code)) {
        try {
          const response = await axios.post("/api/createOneTimeForm");
          if (response.data && response.data.success) {
            const newFormGroupID = response.data.data._id;
            router.push(`/forms/${newFormGroupID}`);
          }
        } catch (error) {
          console.error("Failed to create FormGroup:", error);
        }
      } else {
        setError("Invalid code");
      }
    } catch (error) {
      console.error("Failed to fetch codes:", error);
    }
  };

  return (
    <>
      <Head>
        <title>One Analysis</title>
        <meta name="analysis" content="Analysis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selected="about" sticky={true} />

      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography.Text style={{ color: "white", fontSize: "1.2rem" }}>
          Enter Your Code
        </Typography.Text>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="customInput mb-4 text-black"
          placeholder="Please enter your code for your Analysis Form"
          style={{
            color: "white",
            backgroundColor: "#1f1f1f",
            textAlign: "center",
            width: "30%",
            marginTop: "20px",
          }}
        />
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: "blue",
            borderColor: "blue",
            marginTop: "20px",
            borderRadius: "7px",
          }}
        >
          Submit
        </Button>
      </main>

      <Footer />
    </>
  );
};

export default Reclaim;
