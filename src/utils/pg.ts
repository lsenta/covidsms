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
    return client;
}

export const insertRequest = async (userID: string, reason: string) => {
    const client = await pgClient();
    const res = await client.query(`INSERT INTO requests(userID, reason) VALUES(md5($1), $2) RETURNING requestID`, [userID, reason])
    await client.end();
    return res.rows[0].requestid
}

export const getRequest = async (requestID: string) => {
    const client = await pgClient();
    const res = await client.query(`SELECT * FROM requests WHERE requestID = $1`, [requestID]);
    await client.end();
    return res.rows[0]
}

export const getUser = async (userID: string) => {
    const client = await pgClient();
    const res = await client.query(`SELECT * FROM users WHERE userID = $1`, [userID]);
    await client.end();
    return res.rows[0]
}
