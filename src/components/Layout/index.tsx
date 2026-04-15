import { FC, ReactNode } from 'react';
import { Header, Footer, SessionProvider, CartProvider, DiscountProvider, TotalProvider } from '../';
import { ThemeProvider } from 'ui-forest';

interface LayoutProps {
	children: ReactNode | string;
	title: any;
	description: any;
	menu: any;
	logo: any;
	categories: any;
	favicon?: any;
}

const Layout: FC<LayoutProps> = (props) => {
	const { children, title, description, menu, logo, categories, favicon } = props;

	return (
		<ThemeProvider>
			<CartProvider>
				<DiscountProvider>
					<TotalProvider>
						<SessionProvider>
							<Header logo={logo} menu={menu} title={title} description={description} favicon={favicon} />
							<main>{children}</main>
							<Footer logo={logo} menu={menu} title={title} description={description} categories={categories} />
						</SessionProvider>
					</TotalProvider>
				</DiscountProvider>
			</CartProvider>
		</ThemeProvider>
	);
};

export default Layout;
