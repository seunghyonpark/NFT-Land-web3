import { createFunction } from "inngest"
import { serve } from "inngest/next"
import { sendEmail } from "../../someExistingCode"
// Define your function
const welcomeEmail = createFunction(
  "Send Welcome Email",
  "user.signup",
  async ({ event }) => {
    if (!event.user?.email) {
      throw new Error("Event payload missing email")
    }
    await sendEmail({
      template: "welcome-email",
      to: event.user.email,
      data: {
        // The template will use this to show useful content to our new user
        signupReason: event.data?.signupReason,
      },
    });
    return `Successfully sent`
  }
)

// This is the same as above, you can pass as many functions are you want in the array:
// Grab your key here: https://app.inngest.com/secrets
export default serve("My App", [ welcomeEmail ], {
  //signingKey: process.env.INNGEST_SIGNING_KEY
});