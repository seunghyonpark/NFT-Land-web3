// /pages/api/inngest.js

import { createScheduledFunction } from "inngest"
import { serve } from "inngest/next"
//import { sendWeeklyDigestEmailsToAllUsers } from "../../someExistingCode"
// Your scheduled function
const weeklyDigest = createScheduledFunction(
  "Send Weekly Digest",
  "0 12 * * 1", // At 12:00 every Monday
  async () => {


    /*
    const results = await sendWeeklyDigestEmailsToAllUsers();
    return {
      message: `Weekly digests sent to ${results.sent} users successfully`,
    }
    */

    /* your code, anything returned will be catpured in Inngest logs */
    return "Hello!"


  }
)


export default serve("My App", [ weeklyDigest ], {
    //signingKey: process.env.INNGEST_SIGNING_KEY
});