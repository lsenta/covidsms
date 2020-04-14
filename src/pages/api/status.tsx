import {NextApiRequest, NextApiResponse} from "next";
import {Client} from 'pg';

const pgOptions = {
    host: process.env.POSTGRESQL_HOST!,
    port: parseInt(process.env.POSTGRESQL_PORT!),
    db: process.env.POSTGRESQL_DB!,
    user: process.env.POSTGRESQL_USER!,
    password: process.env.POSTGRESQL_PASSWORD!,
}

const pgClient = async () => {
    const client = new Client(pgOptions)
    await client.connect()
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await pgClient();
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({name: 'John Doe'}))
}

