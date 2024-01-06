import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';
import { useCart } from '../CartProvider';
import { useTotal } from '../TotalProvider';
import { useSession } from '../SessionProvider';
import { Grid } from 'ui-forest';

interface HeaderProps {
	title: string;
	favicon: any;
	description: any;
	menu: any;
	logo: any;
}

const Header: FC<HeaderProps> = (props) => {
	const { title, favicon, description, menu, logo } = props;
	const { cart } = useCart();
	const { total } = useTotal();
	const { session } = useSession();
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
								</Link>
							</div>
						</Grid.Column>
						<Grid.Column lg={8} md={8}>
							<nav className={styles.menu}>
								<ul>
									{menu.map((item: any) => (
										<li key={item.ID} className={styles.menu__item}>
											<Link href={replaceUrlMenu(item.url)}>{item.title}</Link>
										</li>
									))}
								</ul>
							</nav>
						</Grid.Column>
						<Grid.Column lg={2} md={2}>
							<div className={styles.cart}>
								{session ? <div className={styles.user}>{session.name}</div> : null}
								<Link className={styles.cart__link} href="/cart">
									<div className={styles.cart__image}>
										<Image loader={loader} unoptimized={true} layout="fill" src="/images/icon/cart.png" alt="Cart" />
										{cart && cart.length > 0 ? <span className={styles.cart__count}>{cart.length}</span> : null}
									</div>
									<div className={styles.cart__price}>${total}</div>
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
