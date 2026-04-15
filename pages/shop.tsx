import React, { FC } from 'react';
import axios from 'axios';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout, Products } from '../src/components';

interface ShopProps {
	title: any;
	description: any;
	menu: any;
	products: any;
	logo: any;
	categoriesFooter: any;
}
const Shop: FC<ShopProps> = (props) => {
	const { title, description, menu, products, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<Products products={products} title="Products" />
		</Layout>
	);
};
export default Shop;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const products = await woocommerce.get('products', { per_page: 50 });
	const categoriesFooter = await woocommerce.get('products/categories', { per_page: 6 });

	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			products: products.data,
			categoriesFooter: categoriesFooter.data,
		},
		revalidate: 1,
	};
}
