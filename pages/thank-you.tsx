import React, { FC } from 'react';
import axios from 'axios';
import { SITE_INFO, MENU, LOGO } from '../src/utils/endpoints';
import woocommerce from '../src/utils/woocommerce';
import { Layout } from '../src/components';
import { Grid } from 'ui-forest';

interface ThankYouProps {
	title: any;
	description: any;
	menu: any;
	logo: any;
	categoriesFooter: any;
}

const ThankYou: FC<ThankYouProps> = (props) => {
	const { title, description, menu, logo, categoriesFooter } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description} categories={categoriesFooter}>
			<Grid>
				<Grid.Row>
					<Grid.Column col={12}>
						<h4>Thank You</h4>
					</Grid.Column>
				</Grid.Row>
			</Grid>
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
