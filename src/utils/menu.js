export const replaceUrlMenu = (url) => {
	const match = process.env.NEXT_PUBLIC_WORDPRESS_URL;
	const index = url.indexOf(match);
	if (index !== -1) return url.slice(index + match.length);
	return url;
};
