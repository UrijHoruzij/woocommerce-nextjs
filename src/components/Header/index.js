import { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';
import { CartContext, TotalContext } from '../';

const Header = ({ title, favicon, description, menu, logo }) => {
	const [cart, setCart] = useContext(CartContext);
	const [total, setTotal] = useContext(TotalContext);

	return (
		<>
			<Head>
				<title>{title || 'Next WooCommerce'}</title>
				<link rel="icon" href={favicon || '/favicon.ico'} />
			</Head>
			<header className={styles.header}>
				<div className="container">
					<div className="row">
						<div className="col-lg-2 col-md-2">
							<div className={styles.logo}>
								<Link href="/">
									<a>
										{logo ? (
											<Image loader={loader} unoptimized={true} width={196} height={23} src={logo} alt={title} />
										) : (
											title
										)}
									</a>
								</Link>
							</div>
						</div>
						<div className="col-lg-8 col-md-8">
							<nav className={styles.menu}>
								<ul>
									{menu.map((item) => (
										<li key={item.ID} className={styles.menuItem}>
											<Link href={replaceUrlMenu(item.url)}>
												<a>{item.title}</a>
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
						<div className="col-lg-2 col-md-2">
							<div className={styles.cart}>
								<Link href="/cart">
									<a className={styles.cartLink}>
										<div className={styles.cartImage}>
											<Image
												className={styles.image}
												loader={loader}
												unoptimized={true}
												layout="fill"
												src="/images/icon/cart.png"
												alt="Cart"
											/>
											{cart && cart.length > 0 ? <span className={styles.cartCount}>{cart.length}</span> : null}
										</div>
										<div className={styles.price}>${total}</div>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
