import {
  FunctionContext,
  FunctionEvent,
  FunctionResult,
} from "8base-cli-types";

import gql from "graphql-tag";
import { v4 as uuidv4 } from "uuid";
import {addMinutes,addHours,addDays,addMonths,addYears,format} from 'date-fns';

type ResolverResult = FunctionResult;

const initiateOnboarding = async (
  event: FunctionEvent<any>,
  ctx: FunctionContext
): ResolverResult => {
  const { email } = event.data;

  console.log("error");

  try {
    const uuid = uuidv4();
    const date:Date = new Date()
    const expiry:Date = addHours(date,48);

    const CREATE_ONBOARDING_MUTATION = gql`
      mutation OnboardingCreate($data: OnboardingCreateInput!) {
        onboardingCreate(data: $data) {
          id
          email
          token
        }
      }
    `;

    await ctx.api.gqlRequest(CREATE_ONBOARDING_MUTATION, {
      data: {
        email,
        token: uuid,
        expires_at: format(expiry, 'yyyy-MM-dd HH:mm:ss'),
        // expires_at: expiry.toLocaleString(),
        initialized: true,
        // initialized_at: format(date, 'yyyy-MM-ddTHH:mm:ss')
        // initialized_at: date.toLocaleString()
      },
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

export default initiateOnboarding;
