/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom trigger functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/docs/8base-console/custom-functions/triggers/
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    createTasksAutomation:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local createTasksAutomation -p src/resolvers/createTasksAutomation/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local createTasksAutomation -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock createTasksAutomation -m [MOCK_FILE_NAME]
 */

import gql from "graphql-tag";
import logger from "../../utils/logger";

const templateTasksList = gql`
  query templateTasksList($filter: TemplateTaskFilter) {
    templateTasksList(filter: $filter) {
      items {
        id
        name
        phase {
          items {
            id
            stage
            type
          }
        }
      }
    }
  }
`;

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

module.exports = logger((list, event, ctx) => {
   list?.templateTasksList?.items.map(async(item) => {
    console.log(JSON.stringify(item));

    await ctx.api.gqlRequest(taskCreate, {
      data: {
        contactsId: event.originalData.contacts.connect[0].id,
        task_name: item.name,
      },
    });
  });

});
