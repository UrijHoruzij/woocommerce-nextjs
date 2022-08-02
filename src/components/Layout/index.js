import { Header, Footer, CartProvider } from '../';
import { ThemeProvider } from 'ui-forest';

const Layout = ({ children, title, description, menu, logo, categories }) => {
	return (
		<ThemeProvider>
			<CartProvider>
				<Header logo={logo} menu={menu} title={title} description={description} />
				<main>{children}</main>
				<Footer logo={logo} menu={menu} title={title} description={description} categories={categories} />
			</CartProvider>
		</ThemeProvider>
	);
};

export default Layout;
