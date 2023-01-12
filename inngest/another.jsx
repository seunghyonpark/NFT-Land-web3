import { createStepFunction } from "inngest";

export default createStepFunction(
    "My another function",
    "test/demo",
    ({ event, tools }) => {
        tools.sleep("1 second");
        return { event, body: "hello!======" }
    }
);

