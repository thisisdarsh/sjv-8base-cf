import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";
import {
  SENDGRID_USER_WELCOME_MAIL_TEMPLATE_ID,
  sendgridMail,
} from "../../utils/sendgrid";

type TaskResult = FunctionResult<{
  success: boolean;
}>;

const sendWelcomeEmailTask = async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): TaskResult => {
  const { email, password } = event.data;

  try {
    const options = {
      from: "prasad@appengine.cloud",
      personalizations: [
        {
          to: email,
          dynamic_template_data: {
            email,
            password,
            loginUri: "",
          },
        },
      ],
      template_id: SENDGRID_USER_WELCOME_MAIL_TEMPLATE_ID,
    };

    await sendgridMail.send(options);
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

export default sendWelcomeEmailTask;
