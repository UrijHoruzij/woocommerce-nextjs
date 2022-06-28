import axios from 'axios';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout } from '../src/components';

const ThankYou = (props) => {
	const { title, description, menu, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h4>Thank You</h4>
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default ThankYou;

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
