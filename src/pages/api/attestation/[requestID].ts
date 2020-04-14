import {NextApiRequest, NextApiResponse} from "next";
import {getRequest, getUser} from "@utils/pg";
import {formatDate, formatTime} from '@utils/certificate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: {requestID},
    } = req

    const request = await getRequest(requestID as string);
    const user = await getUser(request.userid as string);

    const profile = {
        datesortie: formatDate(request.created),
        heuresortie: formatTime(request.created),
        requestID,
        request,
        user
    }
    const reasons = ['travail']


    res.status(200)
    res.json({profile, reasons})
    // const pdf = await generatePdf(profile, reasons);
    // res.setHeader('Content-type', 'application/pdf');
    // res.send(pdf);
}

export default handler;

