// import templayed from "./templayed";

import { fetchRecord } from "../../utils";

const deleteAndNotify = async ({
  record,
  host,
  port,
  username,
  password,
  secure,
  senderEmail,
  senderName,
  toEmail,
  toName,
  subject,
  body,
  fields,
}) => {
  // const smtpCredentials = {
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   username: "cordie.botsford13@ethereal.email",
  //   password: "3rceXEhXbT9kN4kDTM",
  //   secure: false,
  // };

  const smtpCredentials = {
    host,
    port,
    username,
    password,
    secure,
  };

  const {
    data: { id },
    model: { name: modelName },
  } = record;

  const fragment = {
    fields: fields.split(" "),
  };

  let fetchedRecord;

  try {
    fetchedRecord = await fetchRecord(modelName, id, fragment);
  } catch (error) {
    console.log(error);
  }

  try {
    // // deletion mutation
    const mutationName = `delete${modelName}`;

    // // execute delete mutation
    const mutation = `
        mutation($id: Int!) {
          ${mutationName}(id: $id) {
            id
          }
        }
      `;

    // execute delete mutation
    const { errors } = await gql(mutation, { id });

    if (errors) {
      throw errors;
    }

    const mail = {
      sender: {
        from: senderName ? `"${senderName}" ${senderEmail}` : senderEmail,
        name: senderName,
      },
      recipient: {
        to: fetchedRecord.name
          ? `"${fetchedRecord.name}" ${fetchedRecord.email}`
          : `"${toName}" ${toEmail}`,
      },
      subject,
      // body: templayed(parsedBody)(variableMap),
      body: body
        ? body
        : `${fetchedRecord.name}, your ${modelName} record with id ${id} has been deleted.`,
    };

    // if no error send email
    const sentMail = await smtp(smtpCredentials, mail);

    return {
      result: {
        success: true,
        data: fetchedRecord,
        sentMail,
      },
    };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Record not found");
    } else {
      throw error;
    }
  }

  //   const parsedBody = body;
  //   // throw JSON.stringify(variables);
  //   const variableMap = variables.reduce((previousValue, currentValue) => {
  //     previousValue[currentValue.key] = currentValue.value;
  //     return previousValue;
  //   }, {});
};

export default deleteAndNotify;
