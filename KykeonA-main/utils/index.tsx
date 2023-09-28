export const parseStyles = (style: string) => {
  let modifiedStyle = "";
  const map: any = {};

  const blobs = style.split('">')[1].split("<")[0].split("{");

  let selector = blobs[0];
  for (let i = 1; i < blobs.length; i++) {
    const blob = blobs[i];
    const styleBlock: string = blob
      .split("}")[0]
      .trim()
      .split(";")
      .filter(
        (rule: string) =>
          !rule.includes("font-family") &&
          !rule.includes("background") &&
          !rule.includes("max-width") &&
          !rule.includes("font-size") &&
          !rule.includes("line-height") &&
          !rule.includes("text-indent")
      )
      .join(";");
    const rules = blob.split("}")[1].split(";");

    map[selector] = styleBlock;

    modifiedStyle = `${selector} { ${styleBlock} } ${modifiedStyle}`;

    selector = rules[0];
  }

  return modifiedStyle;
};
