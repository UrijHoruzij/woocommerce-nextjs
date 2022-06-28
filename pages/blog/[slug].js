import axios from 'axios';
import Image from 'next/image';
import { Layout } from '../../src/components';
import { SITE_INFO, MENU, LOGO, POSTS, PAGES } from '../../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import loader from '../../src/utils/loader';

const Product = (props) => {
	const { title, description, menu, content, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<div className="container">{content.title.rendered}</div>
			<date>{content.date}</date>
			<div>{content.rendered}</div>
		</Layout>
	);
};

export default Product;

export async function getStaticProps(context) {
	const {
		params: { slug },
	} = context;
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const post = await axios.get(POSTS, { slug: slug });
	const categoriesFooter = await woocommerce.get('products/categories', { per_page: 6 });

	let content = null;
	if (post.data.length > 0) {
		content = post.data[0];
	} else {
		const page = await axios.get(PAGES, { slug: slug });
		if (page.data.length > 0) content = page.data[0];
	}
	console.log(content);
	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			content: content,
			categoriesFooter: categoriesFooter.data,
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const posts = await axios.get(POSTS);
	const pages = await axios.get(PAGES);
	const pathsData = [];
	posts.data.map((post) => {
		pathsData.push({ params: { slug: post.slug } });
	});
	pages.data.map((page) => {
		pathsData.push({ params: { slug: page.slug } });
	});
	return {
		paths: pathsData,
		fallback: false,
	};
}
