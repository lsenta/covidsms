import {NextApiRequest, NextApiResponse} from "next";
import {getRequest, getUser} from "@utils/pg";
import {formatDate, formatTime, generatePdf} from '@utils/certificate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: {requestID},
    } = req

    const request = await getRequest(requestID as string);
    const user = await getUser(request.userid as string);

    const profile = {
        datesortie: formatDate(request.created),
        heuresortie: formatTime(request.created),
        ...request,
        ...user
    }

    const pdf = await generatePdf(profile, request.reason);
    const buffer = pdf.buffer.slice(pdf.byteOffset, pdf.byteLength + pdf.byteOffset);

    res.status(200)
    res.setHeader('Content-Length', pdf.byteLength);
    res.setHeader('Content-Type', 'application/pdf');
    res.end(Buffer.from(buffer), 'binary');
}

export default handler;

