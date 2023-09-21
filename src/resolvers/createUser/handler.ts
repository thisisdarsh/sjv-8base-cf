import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";

import * as generator from "generate-password";

import gql from "graphql-tag";

import { AUTH0_CONNECTION, auth0Management } from "../../utils/auth0";
import { CreateUserData, User } from "auth0";

type ResolverResult = FunctionResult;

export default async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): ResolverResult => {
  const { firstName, lastName, email, roles, authProfileId, fileId, filename } =
    event.data;

  const password = generator.generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  });

  try {
    const options: CreateUserData = {
      email,
      password,
      email_verified: true,
      connection: AUTH0_CONNECTION,
    };

    // Create Auth0 User
    await auth0Management.createUser(options);

    const CREATE_USER_MUTATION = gql`
      mutation UserCreate($user: UserCreateInput!) {
        userCreate(data: $user) {
          id
          email
          lastName
          firstName
        }
      }
    `;

    // Create 8Base User
    await ctx.api.gqlRequest(CREATE_USER_MUTATION, {
      user: {
        firstName,
        lastName,
        email,
        roles: {
          connect: roles,
        },
        avatar: {
          create: {
            fileId,
            filename,
            public: false,
          },
        },
      },
    });

    await ctx
      .invokeFunction(
        "sendSignupInviteMailTask",
        {
          data: {
            email,
            firstName,
            lastName,
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
            success: false,
          },
          errors: [err],
        };
      });
  } catch (error) {
    console.error(error);

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
