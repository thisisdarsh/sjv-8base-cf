/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/docs/8base-console/custom-functions/webhooks/
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    activateUser:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local activateUser -p src/resolvers/activateUser/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local activateUser -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock activateUser -m [MOCK_FILE_NAME]
 */

// https://api.8base.com/<WORKSPACE_ID>/webhook/activate-user
// https://api.8base.com/cknjbrc7000j70cjwfsyk5442/webhook/activate-user

import { FunctionContext, FunctionEvent } from "8base-cli-types";
import gql from "graphql-tag";

type WebhookResult = {
  statusCode: number;
  body: string;
};

export default async (
  event: FunctionEvent,
  ctx: FunctionContext
): Promise<WebhookResult> => {
  console.log('event.body')
  console.log(event.body)
  const { activate, user } = JSON.parse(event.body);

  const UPDATE_USER_MUTATION = gql`
    mutation UserUpdate($email: String!, $data: UserUpdateInput!) {
      userUpdate(filter: { email: $email }, data: $data) {
        id
      }
    }
  `;

  await ctx.api.gqlRequest(UPDATE_USER_MUTATION, {
    email: user.email,
    data: {
      status: "active",
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      result: `Webhook received: ${activate}`,
    }),
  };
};
