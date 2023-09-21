import gql from "graphql-tag";

export default function (fn) {
  return async function (event, ctx) {
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

    let data = await ctx.api.gqlRequest(templateTasksList, {
      filter: {
        phase: {
          every: {
            id: {
              equals: event.data.id,
            },
          },
        },
      },
    });

    return fn(data, event, ctx);
  };
}
