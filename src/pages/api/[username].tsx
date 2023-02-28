import ListeningToCard from '../../ListeningToCard';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
	id?: string | string[];
	error?: any;
	code?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let lastFMState;
	const apiKey = process.env.NEXT_PUBLIC_LASTFM_API?.toString(),
		username = req.query.username as string;

	try {
		lastFMState = await axios(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
		);
	} catch (err) {
		res.status(400).send({
			error: `If it is taking time, make sure last.fm account under the username ${req.query.username} exists and is scrobbling`,
		});
	}

	if (!lastFMState.data.recenttracks.track[0])
		res.status(400).send({
			error: `If it is taking time, make sure last.fm account under the username ${req.query.username} exists and is scrobbling`,
		});

	res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
	res.setHeader(
		'content-security-policy',
		"default-src 'none'; img-src * data:; style-src 'unsafe-inline'",
	);

	const svg = await ListeningToCard(
		lastFMState.data.recenttracks.track[0].name,
		lastFMState.data.recenttracks.track[0].artist['#text'],
		lastFMState.data.recenttracks.track[0].album['#text'],
		lastFMState.data.recenttracks.track[0].image[3]['#text'],
	);

	res.send(svg as any);
}
