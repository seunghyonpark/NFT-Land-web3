// filename: ./inngest/runBackfillForUser.js
import { createFunction } from "inngest";
import { runBackfillForUser }  from "../lib/backfill-scripts";

export default createFunction(
  "Run backfill for user",     // The name displayed in the Inngest dashboard
  "retool/backfill.requested", // The event triggger
  async ({ event }) => {

    const result = await runBackfillForUser(event.data.user_id);

    return {
      status: result.ok ? 200 : 500,
      message: `Ran backfill for user ${event.data.user_id}`,
    };
    
  }
);
