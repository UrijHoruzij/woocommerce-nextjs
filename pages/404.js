import axios from 'axios';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';
import { Layout } from '../src/components';

const Page404 = (props) => {
	const { title, description, menu, logo } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description}>
			404
		</Layout>
	);
};
export default Page404;

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
