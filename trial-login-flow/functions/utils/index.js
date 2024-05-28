export const fetchRecord = async (modelName, id, fragment = {}) => {
  const queryName = `one${modelName}`;
  // const { name, gql: fragmentGql } = fragment;

  const { name = "DynamicFragment", fields = ["id"] } = fragment;

  const parseToGqlFragment = (modelName, fields, fragmentName = "DynamicFragment") => {
    return `
      fragment ${fragmentName} on ${modelName} {
        ${fields.join("\n")}
      }
    `;
  };

  const fragmentGql = parseToGqlFragment(modelName, fields, name);

  // need to make this more dynamic.. by using fragment
  const defaultFields = `
    id
    email
    name
  `;

  // const query = `
  //   ${fragmentGql || ""}
  //   query($where: ${modelName}FilterInput) {
  //     ${queryName}(where: $where) {
  //       ${fragmentGql ? `...${name}` : defaultFields}
  //     }
  //   }
  // `;

  const query = `
  ${fragmentGql}
  query($where: ${modelName}FilterInput) {
    ${queryName}(where: $where) {
      ...${name}
    }
  }
`;

  const { data, errors } = await gql(query, { where: { id: { eq: id } } });

  if (errors) {
    throw new Error(errors);
  }

  const { [queryName]: record } = data;

  return record;
};
