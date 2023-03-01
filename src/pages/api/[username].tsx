import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import ListeningToCard from '../../ListeningToCard';

interface LastFMResponse {
	recenttracks: {
		track: {
			name: string;
			artist: {
				'#text': string;
			};
			album: {
				'#text': string;
			};
			image: {
				'#text': string;
			}[];
		}[];
	};
}

interface ErrorResponse {
	error: string;
}

interface SuccessResponse {
	svg: string;
}

type Response = ErrorResponse | SuccessResponse;

interface QueryParams {
	color?: string;
	textColor?: string;
	isRounded?: boolean;
	displayName?: boolean;
	apiKey?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	const username = req.query.username as string;
	const queryParams = req.query as QueryParams;

	const {
		color = '000',
		textColor = 'fff',
		isRounded = false,
		displayName = false,
		apiKey = process.env.NEXT_PUBLIC_LASTFM_API,
	} = queryParams;

	try {
		const { data } = await axios.get<LastFMResponse>(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
		);

		const track = data.recenttracks.track[0];

		if (!track) {
			throw new Error(
				`Something went wrong. Make sure last.fm account under the username ${username} exists`,
			);
		}

		res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
		res.setHeader(
			'content-security-policy',
			"default-src 'none'; img-src * data:; style-src 'unsafe-inline'",
		);

		const svg = await ListeningToCard(
			username,
			track.name,
			track.artist['#text'],
			track.album['#text'],
			track.image[3]['#text'],
			{
				color,
				textColor,
				isRounded,
				displayName,
			},
		);

		res.send(svg as any);
	} catch (error) {
		const message =
			error.message ||
			`Something went wrong. Make sure last.fm account under the username ${username} exists`;
		res.status(400).send({ error: message });
	}
}
