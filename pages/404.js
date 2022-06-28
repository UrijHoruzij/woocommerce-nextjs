import axios from 'axios';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout } from '../src/components';

const Page404 = (props) => {
	const { title, description, menu, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			404
		</Layout>
	);
};
export default Page404;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const categoriesFooter = await woocommerce.get('products/categories', { per_page: 6 });

	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			categoriesFooter: categoriesFooter.data,
		},
		revalidate: 1,
	};
}
