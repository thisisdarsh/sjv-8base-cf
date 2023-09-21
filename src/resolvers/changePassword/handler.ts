import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";

import { auth0Management, auth0Authentication } from "../../utils/auth0";
import { ResetPasswordOptions, User } from "auth0";

type ResolverResult = FunctionResult;

const changePassword = async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): ResolverResult => {
  console.log(event.data);
  const { email, password } = event.data;

  let user: User;

  try {
    [user] = await auth0Management.getUsersByEmail(email);
  } catch (error) {
    console.error(error);

    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  if (!user) {
    const error = new Error("No such user.");

    console.error(error);

    return {
      data: {
        success: false,
      },
      errors: [error],
    };
  }

  try {
    const options = {
      email,
      password,
      connection: user.identities ? user.identities[0].connection : "",
    };
    await auth0Authentication.changePassword(options as ResetPasswordOptions);
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

export default changePassword;
