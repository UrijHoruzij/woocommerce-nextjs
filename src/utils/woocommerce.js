const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const woocommerce = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_URL,
	consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
	consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
	version: 'wc/v3',
});

export default woocommerce;
