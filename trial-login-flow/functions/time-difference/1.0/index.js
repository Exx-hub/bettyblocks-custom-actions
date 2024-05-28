import { differenceInDays } from "date-fns";

const timeDifference = async ({ year, month, day }) => {
  // simple validations set for now. need to input correct numbers

  let error = false;

  if (day > 31 || day < 1 || month > 11 || month < 0 || year < 2024) {
    error = true;
  }

  const now = new Date();
  const targetDate = new Date(year, month - 1, day);

  const result = differenceInDays(targetDate, now);

  const difference = result + 1;

  return {
    result: error ? "false" : `${difference}`,
  };
};

export default timeDifference;
