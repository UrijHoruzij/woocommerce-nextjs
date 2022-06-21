import axios from 'axios';
import { SITE_INFO, MENU, POSTS, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout, Categories, Products, LatestPosts } from '../src/components';

const Home = (props) => {
	const { title, description, menu, products, categories, posts, logo } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description}>
			<Categories categories={categories}></Categories>
			<Products products={products} />
			{/* <LatestPosts posts={posts} /> */}
		</Layout>
	);
};
export default Home;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const posts = await axios.get(POSTS, { per_page: 3 });
	const products = await woocommerce.get('products', { per_page: 8 });
	const categories = await woocommerce.get('products/categories', { per_page: 3 });
	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			products: products.data,
			categories: categories.data,
			posts: posts.data,
		},
		revalidate: 1,
	};
}
