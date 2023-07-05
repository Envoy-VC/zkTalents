import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Run the cors middleware
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'POST'],
		origin: '*',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});
	await fetch('https://api.github.com/user', {
		method: 'GET',
		headers: {
			Authorization: req.headers.authorization!,
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			res.json(data);
		});
}

export default handler;
