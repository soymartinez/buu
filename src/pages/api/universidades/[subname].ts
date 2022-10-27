import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { subname } = req.query
    return res.status(200).json({ subname })
}