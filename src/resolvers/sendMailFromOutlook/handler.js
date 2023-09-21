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
 *    sendMailFromOutlook:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local sendMailFromOutlook -p src/resolvers/sendMailFromOutlook/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local sendMailFromOutlook -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock sendMailFromOutlook -m [MOCK_FILE_NAME]
 */
import axios from "axios";
module.exports = async (event, ctx) => {
  const { email, subject, messages, token } = event.data.input;

  const payload = {
    message: {
      subject: subject,
      body: {
        contentType: "Text",
        content: messages,
      },
      toRecipients: [
        {
          emailAddress: {
            address: email,
          },
        },
      ],
      // ccRecipients: [
      //   {
      //     emailAddress: {
      //       address: 'danas@contoso.onmicrosoft.com'
      //     }
      //   }
      // ]
    },
    saveToSentItems: "true",
  };
  try {
    const data = await axios.post(
      "https://graph.microsoft.com/v1.0/me/sendMail",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        result: `Something went to wrong`,
      },
    };
  }
};
