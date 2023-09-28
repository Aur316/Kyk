import axios from "axios";

// Define an interface for the response shape
export interface Collection {
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
export async function fetchCollections(locale: string): Promise<Collection[]> {
  const collectionId =
    locale === "es-ES"
      ? "64e8551d4c784ca827af5bce"
      : "64e35393638b9037fa215859";
  const response = await axios.get(
    `https://api.webflow.com/collections/${collectionId}/items`,
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
