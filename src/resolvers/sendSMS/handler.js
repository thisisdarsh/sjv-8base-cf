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
 *    sendSMS:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local sendSMS -p src/resolvers/sendSMS/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local sendSMS -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock sendSMS -m [MOCK_FILE_NAME]
 */

export default async (event, ctx) => {
  // const { to, from, message, token } = event.data.input;
  const to = "6782503695";
  const from = "+13238158892";
  const token =
    "0pDMTJQMDFQQVMwMHxBQUJXQVF5NlVwM3Z2Q3laNWZyV1RUNHdoV2p5Q2czTTZSb1dmTXV6dzlJYTZpWERGUGJ4emVvMzlWdGczdE4za29PMUdUQ19vUG41TngzSzdSWHdVWUJDanpKMXB2eGxfcGV5Wmowc3JPWTdQamt6Zmpmd2MwZTFOY0RQWUZ5NlNDaWtTa1Z1b1VDdW9HRDdGajRiZXZRWjlDVWRWYlFiWnJJUFVJd3VqUmZUendjUl93TVNxNkdoeXFoekNlYVliVjRsS3dIbXJfQXxUUkczVVF8Q1NZNTlqQ1ptVVFvcW5lajdTVDRUd3xBUXxBQXxBQUFBQUY3cXZJOA";
  const message = "test";

  try {
    await ctx
      .invokeFunction(
        "sendSMSTask",
        {
          data: {
            to,
            from,
            message,
            token,
          },
        },
        {
          waitForResponse: false,
        }
      )
      .catch((err) => {
        console.log(err);
        return {
          data: {
            result: false,
          },
          errors: [err],
        };
      });
  } catch (err) {
    return {
      data: {
        result: false,
      },
      errors: [err],
    };
  }
  return {
    data: {
      result: "Send SMS",
    },
  };
};
