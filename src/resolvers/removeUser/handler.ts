import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";

import { auth0Management, AUTH0_CONNECTION_ID } from "../../utils/auth0";

import { ObjectWithId, PasswordChangeTicketParams, User } from "auth0";

import gql from "graphql-tag";

const DELETE_USER_MUTATION = gql`
  mutation UserDelete($data: UserDeleteInput!) {
    userDelete(data: $data) {
      success
    }
  }
`;

const USER_QUERY = gql`
query User($email: String!) {
  user(email: $email) {
    id
  }
}
`;

type ResolverResult = FunctionResult<{
  success: boolean;
}>;

const removeUser = async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): ResolverResult => {
  const { email } = event.data;

  let user: User;

  try {
    [user] = await auth0Management.getUsersByEmail(email);

    console.log('user')
    console.log(user)

    if (user) {
      const params: ObjectWithId = {
        id: user.user_id || "",
      };
      await auth0Management.deleteUser(params);
    }

    const result: any = await ctx.api.gqlRequest(USER_QUERY, {
      email,
    });

    console.log('user')
    console.log(result)

    if (result && result.user) {
      await ctx.api.gqlRequest(DELETE_USER_MUTATION, {
        data: {
          id: result.user.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
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

export default removeUser;
