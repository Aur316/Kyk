import axios from "axios";

// Define an interface for the response shape
export interface Warnings {
  name: string;
  slug: string;
  "001": {
    fileId: string;
    url: string;
    alt: string | null;
  };
  _id: string;
  tldr: string;
}

export async function fetchWarnings(locale: string): Promise<Warnings[]> {
  const warningCollectionId =
    locale === "es-ES"
      ? "64ec65bed26d5926f471d08a"
      : "64e6f647b9c593b1560f7044";

  const response = await axios.get(
    `https://api.webflow.com/collections/${warningCollectionId}/items`,
    {
      headers: {
        accept: "application/json",
        authorization:
          "Bearer 50aede3e1b8ad8c3cacfde8e68d5c33318989cfa0916350e0ebf1873b971c67b",
      },
    }
  );

  return response.data.items;
}
