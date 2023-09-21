const sendgridMail = require("@sendgrid/mail");

export const SENDGRID_API_KEY =
  "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";

export const SENDGRID_USER_WELCOME_MAIL_TEMPLATE_ID =
  "d-e9111e15582e4f12a9c928d1e2f94a77";

export const SENDGRID_USER_SIGNUP_INVITE_MAIL_TEMPLATE_ID =
  "d-a7065ee0f0c4418eb307d5be5ef4098c";

export const SENDGRID_SENDER_EMAIL = "dev@ascendware.net";

sendgridMail.setApiKey(SENDGRID_API_KEY);

export { sendgridMail };
