const allowedImageWordPressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname;

module.exports = {
	reactStrictMode: true,
	images: {
		loader: 'custom',
		domains: [allowedImageWordPressDomain],
	},
};
