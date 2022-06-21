import axios from 'axios';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout, Products } from '../src/components';

const Shop = (props) => {
	const { title, description, menu, products, logo } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description}>
			<Products products={products} />
		</Layout>
	);
};
export default Shop;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const products = await woocommerce.get('products', { per_page: 50 });
	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			products: products.data,
		},
		revalidate: 1,
	};
}
