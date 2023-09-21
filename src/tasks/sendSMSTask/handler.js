/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom task functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/docs/8base-console/custom-functions/tasks/
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    sendSMSTask:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local sendSMSTask -p src/resolvers/sendSMSTask/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local sendSMSTask -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock sendSMSTask -m [MOCK_FILE_NAME]
 */

const axios = require("axios").default;

const sendSMSTask = async (event, ctx) => {
  const { to, from, message, token } = event.data;

  try {
    axios.post(
      "https://platform.devtest.ringcentral.com/restapi/v1.0/account/~/extension/~/sms",
      {
        from: { phoneNumber: +from },
        to: [{ phoneNumber: +to }],
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return {
      data: {
        result: false,
      },
      errors: [error],
    };
  }

  return {
    data: {
      result: "Send SMS",
    },
  };
};

export default sendSMSTask;
