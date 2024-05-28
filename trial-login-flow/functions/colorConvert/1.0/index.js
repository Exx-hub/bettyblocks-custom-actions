import { GetColorName } from "hex-color-to-color-name";
import convertCssColorNameToHex from "convert-css-color-name-to-hex";

const colorConvert = async ({ input }) => {
  let colorName;

  if (input.includes("#")) {
    colorName = GetColorName(input);
  } else {
    colorName = convertCssColorNameToHex(input);
  }

  return {
    result: colorName === input ? false : colorName,
  };
};

export default colorConvert;
