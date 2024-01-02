import axios from 'axios';
import { Layout, Checkout } from '../src/components/';
import woocommerce from '../src/utils/woocommerce';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';

const CheckoutPage = ({ title, description, menu, logo, categoriesFooter, shipping }) => {
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<Checkout shipping={shipping} />
		</Layout>
	);
};
export default CheckoutPage;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const categoriesFooter = await woocommerce.get('products/categories', { per_page: 6 });
	const shipping = await woocommerce.get('shipping_methods');
	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			categoriesFooter: categoriesFooter.data,
			shipping: shipping.data,
		},
		revalidate: 1,
	};
}
