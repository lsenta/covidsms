import {NextApiRequest, NextApiResponse} from "next";
import {withCORS} from "@api/utils";
import {insertRequest} from "@api/utils/pg";
import Twilio from 'twilio';
import {REASONS} from "@api/utils/certificate";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const URL = process.env.APP_URL;

const client = Twilio(accountSid, authToken);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {To, From, Body} = req.body

    const body = (Body as string).toLowerCase();
    const reason = REASONS.reduce((previous, current) => (
        body.includes(current) ? current : previous
    ), 'courses')

    const requestID = await insertRequest(From, reason);

    await client.messages
        .create({
            body: `visit: ${URL}/api/attestation/${requestID}`,
            from: To,
            to: From
        })

    res.end("OK");
    res.statusCode = 200
}

export default withCORS(handler)
