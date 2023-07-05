import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '@/config';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Run the cors middleware
	await NextCors(req, res, {
		// Options
		methods: ['GET', 'POST'],
		origin: '*',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});
	console.log(req.query.code);
	const params =
		'?client_id=' +
		GITHUB_CLIENT_ID +
		'&client_secret=' +
		GITHUB_CLIENT_SECRET +
		'&code=' +
		req.query.code;

	await fetch('https://github.com/login/oauth/access_token' + params, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
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
