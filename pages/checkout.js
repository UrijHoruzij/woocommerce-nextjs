import axios from 'axios';
import { Layout, Checkout } from '../src/components/';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';

const CheckoutPage = ({ title, description, menu, logo }) => {
	return (
		<Layout logo={logo} menu={menu} title={title} description={description}>
			<Checkout />
		</Layout>
	);
};
export default CheckoutPage;

export async function getStaticProps() {
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);

	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
		},
		revalidate: 1,
	};
}
