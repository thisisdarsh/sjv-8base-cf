import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";

const axios = require("axios").default;

import { auth0Management, AUTH0_CONNECTION_ID } from "../../utils/auth0";

import { PasswordChangeTicketParams } from "auth0";

import {
  SENDGRID_SENDER_EMAIL,
  SENDGRID_USER_SIGNUP_INVITE_MAIL_TEMPLATE_ID,
  sendgridMail,
} from "../../utils/sendgrid";

type TaskResult = FunctionResult<{
  success: boolean;
}>;

const sendSignupInviteMailTask = async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): TaskResult => {
  const { email, firstName, lastName } = event.data;

  try {
    const passwordChangeTicketParams: PasswordChangeTicketParams = {
      result_url: "https://softwarejv-sjv-2023.vercel.app",
      email,
      connection_id: AUTH0_CONNECTION_ID,
    };

    const { ticket } = await auth0Management.createPasswordChangeTicket(
      passwordChangeTicketParams
    );

    const options = {
      from: SENDGRID_SENDER_EMAIL,
      personalizations: [
        {
          to: email,
          dynamic_template_data: {
            email,
            firstName,
            lastName,
            inviteUri: ticket,
          },
        },
      ],
      template_id: SENDGRID_USER_SIGNUP_INVITE_MAIL_TEMPLATE_ID,
    };

    await sendgridMail.send(options);
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

export default sendSignupInviteMailTask;
