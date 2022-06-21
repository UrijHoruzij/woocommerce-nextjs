import { Header, Footer, CartProvider } from '../';

const Layout = ({ children, title, description, menu, logo }) => {
	return (
		<CartProvider>
			<Header logo={logo} menu={menu} title={title} description={description} />
			<main>{children}</main>
			<Footer logo={logo} menu={menu} title={title} description={description} />
		</CartProvider>
	);
};

export default Layout;
