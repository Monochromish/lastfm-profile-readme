const ListeningToCard = async (
	name: string,
	artistName: string,
	albumName: string,
	artwork: string,
) => {
	return `
		<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
			<rect width="400" height="100" fill="#070D0D" rx="8" />
			<clipPath id="artwork-clip">
				<rect x="8" y="8" width="80" height="84" rx="16" />
			</clipPath>
			<image href="${artwork}" x="16" y="15" width="64" height="64" clipPath="url(#artwork-clip)" />
			<text font-family="system-ui" x="100" y="35" fill="#666666" className="text-sm font-medium" dominantBaseline="middle">
				Currently Listening To
			</text>
			<text font-family="system-ui" x="100" y="55" fill="#F9FAFB" className="text-lg font-bold" dominantBaseline="middle">
				${encodeText(name)}
			</text>
			<text font-family="system-ui" x="100" y="70" fill="#F9FAFB" className="text-sm font-medium" dominantBaseline="middle">
				By ${encodeText(artistName)} on ${encodeText(albumName)}
			</text>
		</svg>
	`;
};

const encodeText = (text: string): string => {
	return text.replace(/&/g, '&amp;');
};

export default ListeningToCard;
