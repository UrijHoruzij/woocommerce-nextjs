import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';
import { Grid } from 'ui-forest';

const Footer = (props) => {
	const { menu, title, description, logo, categories } = props;
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__top}>
				<Grid>
					<Grid.Row>
						<Grid.Column md={4}>
							<div className={styles.footer__logo}>
								<Link href="/">
									<a>
										{logo ? (
											<Image loader={loader} unoptimized={true} width={130} height={31} src={logo} alt={title} />
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
							<p className={styles.footer__text}>{description}</p>
						</Grid.Column>
						<Grid.Column md={3}>
							<h4 className={styles.footer__listTitle}>Information</h4>
							<ul className={styles.footer__list}>
								{menu.map((item) => (
									<li key={item.ID}>
										<Link href={replaceUrlMenu(item.url)}>
											<a className={styles.footer__link}>{item.title}</a>
										</Link>
									</li>
								))}
							</ul>
						</Grid.Column>
						<Grid.Column md={5}>
							<h4 className={styles.footer__listTitle}>Category</h4>
							<ul className={styles.footer__list}>
								{categories.map((category) => (
									<li key={category.id}>
										<Link href={`/category/${category.slug}`}>
											<a className={styles.footer__link}>{category.name}</a>
										</Link>
									</li>
								))}
							</ul>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
			<div className={styles.footer__bottom}>
				<Grid>
					<Grid.Row>
						<Grid.Column col={12}>
							<p className={styles.footer__copyright}>
								© {new Date().getFullYear()} {title}
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</footer>
	);
};

export default Footer;
