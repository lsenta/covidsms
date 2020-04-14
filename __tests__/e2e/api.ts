import fetch from 'isomorphic-unfetch'

const API_URL = 'http://localhost:3000/api'

describe('status api', () => {
    it('returns 200', async () => {
        const r = await fetch(`${API_URL}/status`)
        expect(r.status).toEqual(200);
    })
})

describe('webfinger api', () => {
    it('returns jrd json', async () => {
        const r = await fetch(`${API_URL}/.well-know/webfinger?resource=acct:JohnDoe@localhost`)
        expect(r.status).toEqual(200);
        expect(r.headers.get('Content-Type')).toEqual('application/jrd+json')
    })
})

describe('me api', () => {
    it('returns 200', async () => {
        const r = await fetch(`${API_URL}/me`)
        expect(r.status).toEqual(200);
    })

    it('returns * CORS', async () => {
        const r = await fetch(`${API_URL}/me`)
        expect(r.headers.get('Access-Control-Allow-Origin')).toEqual('*')
    })
})
