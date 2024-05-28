const sumCustom = async ({ numberOne, numberTwo }) => {
  console.log({ numberOne, numberTwo });

  return {
    result: numberOne + numberTwo,
  };
};

export default sumCustom;
