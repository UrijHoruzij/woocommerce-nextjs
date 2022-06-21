import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import loader from '../../utils/loader';
import { replaceUrlMenu } from '../../utils/menu';

const Footer = (props) => {
	const { menu, title, description, logo } = props;
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
