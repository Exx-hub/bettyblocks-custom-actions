import { fetchRecord } from "../../utils";

const fetchUser = async ({ record }) => {
  const {
    data: { id },
    model: { name: modelName },
  } = record;

  if (!id || !modelName) {
    throw new Error("Invalid input: id and model name required");
  }

  try {
    const record = await fetchRecord(modelName, id);

    return {
      result: {
        record,
      },
    };
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
};

export default fetchUser;
