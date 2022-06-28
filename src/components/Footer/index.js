import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';

const Footer = (props) => {
	const { menu, title, description, logo, categories } = props;
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__top}>
				<div className="container">
					<div className="row">
						<div className="col-md-4">
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
						</div>
						<div className="col-md-3">
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
						</div>
						<div className="col-md-5">
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
						</div>
					</div>
				</div>
			</div>
			<div className={styles.footer__bottom}>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<p className={styles.footer__copyright}>
								© {new Date().getFullYear()} {title}
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div className={styles.about}>
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
							<p>{description}</p>
						</div>
					</div>
					<div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
						<div className={styles.menu}>
							<h6 className={styles.menuTitle}>Shopping</h6>
							<ul>
								{menu.map((item) => (
									<li key={item.ID} className={styles.menuItem}>
										<Link href={replaceUrlMenu(item.url)}>
											<a className={styles.menuLink}>{item.title}</a>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className={styles.copyright}>
							Copyright © {new Date().getFullYear()} {title}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
