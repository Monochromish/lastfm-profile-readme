import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Head from 'next/head';

export default function Home(): JSX.Element {
	const router = useRouter();
	const [username, setUsername] = useState<string>('');

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter' && username.trim().length > 0) {
			router.push(`/api/${username.trim()}`);
		}
	};

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setUsername(event.target.value);
	};

	return (
		<>
			<Head>
				<title>Last.fm Profile Readme</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className="flex flex-col items-center justify-between p-4 mx-auto min-h-screen bg-black text-center">
				<main className="flex-grow">
					<div className="p-2">
						<h1 className="text-xl text-red-400">Last.fm Profile Readme 🪄</h1>
						<h3 className="text-white">
							Expose your currently listening song and display it on your profile
						</h3>
					</div>

					<input
						name="username"
						type="text"
						placeholder="Your Last.fm Username"
						className="bg-transparent text-gray-500 border border-gray-500 w-full p-2 rounded-md focus:border-red-400 outline-0	focus:text-white"
						value={username}
						onChange={handleUsernameChange}
						onKeyDown={handleKeyDown}
						autoComplete="off"
						autoCorrect="off"
					/>
				</main>

				<footer className="py-4">
					<h4 className="text-white font-bold">
						Made with <span className="text-red-500">&hearts;</span> by Monochromish with Next.js
						and TypeScript
					</h4>
				</footer>
			</div>
		</>
	);
}
