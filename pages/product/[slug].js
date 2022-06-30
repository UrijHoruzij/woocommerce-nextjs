import axios from 'axios';
import { Layout, Product } from '../../src/components';
import woocommerce from '../../src/utils/woocommerce';
import { SITE_INFO, MENU, LOGO } from '../../src/utils/endpoints';

const ProductPage = (props) => {
	const { title, description, menu, product, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<Product product={product} title="Products" />
		</Layout>
	);
};

export default ProductPage;

export async function getStaticProps(context) {
	const {
		params: { slug },
	} = context;
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const product = await woocommerce.get('products', { slug: slug });
	const categoriesFooter = await woocommerce.get('products/categories', { per_page: 6 });
	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			product: product.data[0],
			categoriesFooter: categoriesFooter.data,
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const products = await woocommerce.get(`products`, { per_page: 100 });
	const pathsData = [];
	products.data.map((product) => {
		pathsData.push({ params: { slug: product.slug } });
	});
	return {
		paths: pathsData,
		fallback: false,
	};
}
