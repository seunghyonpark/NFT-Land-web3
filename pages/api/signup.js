import { Inngest } from "inngest";

export default async function handler(req, res) {


    


    const { email, password, signupReason } = req.body;

    /////const result = await createNewUser(email, password);

    const inngest = new Inngest({ eventKey: process.env.INNGEST_EVENT_KEY });

    await inngest.send({
    name: "user.signup",
    data: { signupReason },
    user: { email },
    });

    res.status(200).json({ success: true });

}