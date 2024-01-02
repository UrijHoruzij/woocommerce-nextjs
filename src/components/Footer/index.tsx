import { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';
import { Grid } from 'ui-forest';

interface FooterProps {
	menu: any[];
	title: string;
	description: string | ReactNode;
	logo: string;
	categories: any[];
}

const Footer: FC<FooterProps> = (props) => {
	const { menu, title, description, logo, categories } = props;
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__top}>
				<Grid>
					<Grid.Row>
						<Grid.Column md={4}>
							<div className={styles.footer__logo}>
								<Link href="/">
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
								</Link>
							</div>
							<p className={styles.footer__text}>{description}</p>
						</Grid.Column>
						<Grid.Column md={3}>
							<h4 className={styles.footer__listTitle}>Information</h4>
							<ul className={styles.footer__list}>
								{menu.map((item) => (
									<li key={item.ID}>
										<Link className={styles.footer__link} href={replaceUrlMenu(item.url)}>
											{item.title}
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
										<Link className={styles.footer__link} href={`/category/${category.slug}`}>
											{category.name}
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
