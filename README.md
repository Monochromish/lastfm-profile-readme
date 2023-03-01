# Last.fm Profile Readme

Expose your currently listening song and display it on your profile.
Written with <3 in Next.js and TypeScript

## Usage

To display your currently listening song, add an image to your readme with the following link:

`https://lastfm-profile-readme.vercel.app/api/:username`

Replace :username with your Last.fm username. The API will return an SVG image with your currently listening song details, which can be displayed in your Github profile readme.

Here is an example of how it should look:

```less
![Currently listening to](https://lastfm-profile-readme.vercel.app/api/Monochromish)
```

![Currently listening to](https://lastfm-profile-readme.vercel.app/api/Monochromish)

### Customization

You can customize the image by adding query parameters to the link:

- `color` - The color of the card (Hex color code) (Default: `#000`)
- `textColor` - The color of the text (Hex color code) (Default: `#fff`)
- `isRounded` - Whether the card should be rounded or not (Default: `false`)
- `displayName` - Whether last.fm username should be displayed or not (Default: `false`)
- `apiKey` - You can use your own Last.fm API key in case my preexisting one dies somehow

Here is an example of how it should look with url queries:

```less
![Currently listening to](https://lastfm-profile-readme.vercel.app/api/Monochromish?color=25332E&textColor=D8D8D8&isRounded=true&displayName=true)
```

![Currently listening to](https://lastfm-profile-readme.vercel.app/api/Monochromish?color=25332E&textColor=D8D8D8&isRounded=true&displayName=true)

## Contributing

Contributions are always welcome. If you have an idea or find a bug, feel free to open an issue or submit a pull request. However, please make sure to test your changes before creating the pull request.

If you find this project useful, please consider giving it a star.
