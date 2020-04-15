import {NextApiRequest, NextApiResponse} from "next";
import {withCORS} from "@utils/api";
import {insertRequest} from "@utils/pg";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const URL = process.env.APP_URL;
const REASONS = ['courses', 'travail', 'sante', 'famille', 'sport', 'judiciaire', 'missions'];

const client = require('twilio')(accountSid, authToken);

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
