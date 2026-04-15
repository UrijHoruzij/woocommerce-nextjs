const allowedImageWordPressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname;
// const withTM = require('next-transpile-modules')(['ui-forest']);

module.exports = {
	reactStrictMode: true,
	images: {
		loader: 'custom',
		domains: [allowedImageWordPressDomain],
	},
};
