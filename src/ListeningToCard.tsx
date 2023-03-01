import https from 'https';

interface ListeningToCardProps {
	color?: string;
	textColor?: string;
	isRounded?: boolean;
	displayName?: boolean;
}

const ListeningToCard = async (
	username: string,
	name: string,
	artistName: string,
	albumName: string,
	artwork: string,
	props?: ListeningToCardProps,
) => {
	const artworkBase64 = await new Promise<string>((resolve, reject) => {
		https.get(artwork, res => {
			let chunks: any[] = [];
			res.on('data', chunk => {
				chunks.push(chunk);
			});
			res.on('end', () => {
				const imageBuffer = Buffer.concat(chunks);
				const base64String = imageBuffer.toString('base64');
				resolve(base64String);
			});
			res.on('error', reject);
		});
	});

	return `
    <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="100" fill="#${props.color}" rx="${props.isRounded ? 8 : 0}" />
      <clipPath id="artwork-clip">
        <rect x="8" y="8" width="80" height="84" rx="16" />
      </clipPath>
      <image href="data:image/jpeg;base64,${artworkBase64}" x="16" y="15" width="64" height="64" clipPath="url(#artwork-clip)" />
      <text font-family="system-ui" x="100" y="35" fill="#${
				props.textColor
			}" dominantBaseline="middle" style="filter: brightness(0.6);">
        Currently Listening To
      </text>
      <text font-family="system-ui" x="100" y="55" fill="#${
				props.textColor
			}" dominantBaseline="middle">
        ${encodeText(name)}
      </text>
      <text font-family="system-ui" x="100" y="70" fill="#${
				props.textColor
			}" dominantBaseline="middle">
        By ${encodeText(artistName)} on ${encodeText(albumName)}
      </text>
	   ${
				props.displayName
					? `<text font-family="system-ui" x="395" y="95" fill="#${
							props.textColor
					  }" dominantBaseline="baseline" text-anchor="end" style="filter: brightness(0.6);">${
							username || ''
					  }</text>`
					: ''
			}
    </svg>
  `;
};

const encodeText = (text: string): string => {
	const truncatedText = text.length > 18 ? text.slice(0, 18) + '...' : text;
	return truncatedText.replace(/&/g, '&amp;');
};

export default ListeningToCard;
