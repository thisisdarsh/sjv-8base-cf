import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";

import { auth0Management, auth0Authentication } from "../../utils/auth0";
import { ResetPasswordEmailOptions, User } from "auth0";

type ResolverResult = FunctionResult;

const userForgotPassword = async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): ResolverResult => {
  console.log(event.data);
  const { email } = event.data;

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
    const options: ResetPasswordEmailOptions = {
      email,
      connection: user.identities ? user.identities[0].connection : "",
    };
    await auth0Authentication.requestChangePasswordEmail(options);
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

export default userForgotPassword;
