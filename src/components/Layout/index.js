import { Header, Footer, CartProvider } from '../';

const Layout = ({ children, title, description, menu, logo, categories }) => {
	return (
		<CartProvider>
			<Header logo={logo} menu={menu} title={title} description={description} />
			<main>{children}</main>
			<Footer logo={logo} menu={menu} title={title} description={description} categories={categories} />
		</CartProvider>
	);
};

export default Layout;
