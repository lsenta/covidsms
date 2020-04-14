import fetch from 'isomorphic-unfetch'

const API_URL = 'http://localhost:3000/api'

describe('status api', () => {
    it('returns 200', async () => {
        const r = await fetch(`${API_URL}/status`)
        expect(r.status).toEqual(200);
    })
})