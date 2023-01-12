import { createFunction } from "inngest"
// Arguments:
// - Function name
// - Event name
// - The function code to run - the `event` arg is the payload
const welcomeEmail = createFunction(
    "Send Welcome Email",
    "user.signup",
    /* The `event` arg contains the entire data object that you sent above */
    ({ event }) => {

    /* your code, anything returned will be catpured in Inngest logs */
    return `Hello ${event.name}!` // = "Hello user.signup!"
    }
)
