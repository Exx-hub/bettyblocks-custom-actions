import join from "lodash/join";

const concatenateNames = async ({ nameOne, nameTwo }) => {
  // const { nameOne, nameTwo } = options;
  // these are in the options in options array in function.json

  return {
    // result: nameOne.concat(nameTwo),
    // result: `${nameOne} ${nameTwo}`,
    result: join([nameOne, nameTwo], " "),
  };
};

export default concatenateNames;
