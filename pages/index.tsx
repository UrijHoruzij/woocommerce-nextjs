import React, { FC } from 'react';
import axios from 'axios';
import { SITE_INFO, MENU, POSTS, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout, Categories, Products, LatestPosts, Hero, Service, Newsletter } from '../src/components';

interface HomeProps {
	title: any;
	description: any;
	menu: any;
	products: any;
	categories: any;
	posts: any;
	logo: any;
	categoriesFooter: any;
}

const Home: FC<HomeProps> = (props) => {
	const { title, description, menu, products, categories, posts, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<Hero />
			<Service />
			<Categories categories={categories}></Categories>
			{/* <Products products={products} title="Products of the week" /> */}
			<LatestPosts posts={posts} />
			{/* <Newsletter /> */}
		</Layout>
	);
};
export default Home;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const posts = await axios.get(POSTS, { params: { per_page: 3 } });
	const products = await woocommerce.get('products', { per_page: 8 });
	const categories = await woocommerce.get('products/categories', { per_page: 3 });
	const categoriesFooter = await woocommerce.get('products/categories', { per_page: 6 });

	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			products: products.data,
			categories: categories.data,
			posts: posts.data,
			categoriesFooter: categoriesFooter.data,
		},
		revalidate: 1,
	};
}
