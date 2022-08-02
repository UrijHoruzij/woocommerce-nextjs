import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';
import { CartContext, TotalContext, UserContext } from '../';
import { Grid } from 'ui-forest';

const Header = ({ title, favicon, description, menu, logo }) => {
	const [cart, setCart] = useContext(CartContext);
	const [total, setTotal] = useContext(TotalContext);
	const [user, setUser] = useContext(UserContext);
	return (
		<>
			<Head>
				<title>{title || 'Next WooCommerce'}</title>
				<link rel="icon" href={favicon || '/favicon.svg'} />
			</Head>
			<header className={styles.header}>
				<Grid>
					<Grid.Row>
						<Grid.Column lg={2} md={2}>
							<div className={styles.logo}>
								<Link href="/">
									<a>
										{logo ? (
											<Image loader={loader} unoptimized={true} width={100} height={24} src={logo} alt={title} />
										) : (
											<Image
												loader={loader}
												unoptimized={true}
												width={130}
												height={31}
												src="/images/logo.svg"
												alt={title}
											/>
										)}
									</a>
								</Link>
							</div>
						</Grid.Column>
						<Grid.Column lg={8} md={8}>
							<nav className={styles.menu}>
								<ul>
									{menu.map((item) => (
										<li key={item.ID} className={styles.menu__item}>
											<Link href={replaceUrlMenu(item.url)}>
												<a>{item.title}</a>
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</Grid.Column>
						<Grid.Column lg={2} md={2}>
							<div className={styles.cart}>
								{user ? <div className={styles.user}>{user.name}</div> : null}
								<Link href="/cart">
									<a className={styles.cart__link}>
										<div className={styles.cart__image}>
											<Image loader={loader} unoptimized={true} layout="fill" src="/images/icon/cart.png" alt="Cart" />
											{cart && cart.length > 0 ? <span className={styles.cart__count}>{cart.length}</span> : null}
										</div>
										<div className={styles.cart__price}>${total}</div>
									</a>
								</Link>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</header>
		</>
	);
};

export default Header;
