import { createClient } from "contentful";

const contentful_client = createClient({
  space: "dhw1od47ash4",
  accessToken: "qTmMAOXK4DH3pO_4oP5hCzbJ3rM4d2Mba1LsvhBOYjQ",
  host: "cdn.contentful.com",
  environment: "master",
});

export const get_news_posts = async (locale: "es-ES" | "en-US" = "en-US") => {
  const entries = await contentful_client.getEntries({
    content_type: "news_post",
    locale,
  });

  return Promise.all(
    entries.items
      .filter((item: any) => !!item.fields.body?.content)
      .map(async (item: any) => {
        const leadingImage = await get_asset(item.fields.leadingImage.sys.id);

        const body = {
          ...item.fields.body,
          content: await Promise.all(
            item.fields.body.content.map(async (item: any) => {
              if (item.nodeType !== "embedded-asset-block") {
                return item;
              }

              const asset = await get_asset(item.data.target.sys.id);

              return {
                ...item,
                ...asset,
              };
            })
          ),
        };

        return {
          ...item.fields,
          leadingImage,
          body,
        };
      })
  );
};

export const get_image_link = (item: any, isThumb: boolean) => {

  const id =
    item["IMAGES"]?.split("/d/")[1]?.split("/")?.[0] ??
    item["IMAGES"]?.split("id=")?.[1]?.split("&")?.[0];

  if (!id) {
    if (isThumb) {
      return `${item["IMAGES"]}?fit=thumb&q=40&w=150&h=70`.replace(
        "contentful.com",
        "ctfassets.net"
      );
    }
    return `${item["IMAGES"]}`.replace("contentful.com", "ctfassets.net");
  }

  return `https://drive.google.com/uc?export=view&id=${id}`;
};

export const get_asset = async (asset_id: string) =>
  (await contentful_client.getAsset(asset_id)).fields;

export const get_results = async () => {
  const entries = await contentful_client.getEntries({
    content_type: "substances",
  });

  return entries.items.map((item: any) => ({
    sampleNr: item.fields.sampleNr ?? null,
    title: item.fields.title,
    purity: item.fields.purity,
    substanceClass: item.fields.substanceClass,
    substance: item.fields.substance,
    appearance: item.fields.appearance.fields,
    vendor: item.fields.vendor,
    dateOfPurchase: item.fields.dateOfPurchase ?? null,
    substancesIdentified: item.fields.substancesIdentified,
    infraredSpectrumFtIr: item.fields.infraredSpectrumFtIr ?? null,
    hplcMsms: item.fields.hplcMsms ?? null,
    nmr: item.fields.nmr ?? null,
    fullReport: item.fields.fullReport ?? null,
    analysisResultsSpectra: item.fields.analysisResultsSpectra ?? null,
    comments: item.fields.comments ?? null,
    highlightWarningRow: item.fields.highlightWarningRow,
  }));
};
