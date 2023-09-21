/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/docs/8base-console/custom-functions/resolvers/
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    sendMailFromGoogle:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local sendMailFromGoogle -p src/resolvers/sendMailFromGoogle/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local sendMailFromGoogle -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock sendMailFromGoogle -m [MOCK_FILE_NAME]
 */

import axios from "axios";
import { encode } from "js-base64";

module.exports = async (event, ctx) => {
  const { email, subject, messages, token } = event.data.input;
  const message = ["To: " + email, "Subject: " + subject, "", messages].join(
    "\n"
  );
  
  try {
    const data = await axios.post(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
      {
        raw: encode(message),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      return {
        data: {
          result: `Mail sent`,
        },
      };
    } else {
      return {
        data: {
          result: `Something went to wrong!!!`,
        },
      };
    }
  } catch (error) {
    return {
      data: {
        result: `Something went to wrong!`,
      },
    };
  }
};
