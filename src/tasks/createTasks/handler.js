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
 *    createTasks:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local createTasks -p src/resolvers/createTasks/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local createTasks -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock createTasks -m [MOCK_FILE_NAME]
 */

import gql from "graphql-tag";

const createTasks =  async (event, ctx) => {
  const taskCreate = gql`
    mutation taskCreate($data: TaskCreateInput!) {
      taskCreate(data: $data) {
        id
        task_name
        due_date
        status
      }
    }
  `;
  console.log(event);
  try {
    await ctx.api.gqlRequest(taskCreate, event.data);
  } catch (error) {
    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  return {
    data: {
      success: true,
    },
  };
};
export default createTasks