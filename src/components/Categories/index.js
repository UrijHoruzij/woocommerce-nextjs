import Image from 'next/image';
import Link from 'next/link';
import styles from './Categories.module.scss';
import loader from '../../utils/loader';

const Categories = (props) => {
	const { categories } = props;
	return (
		<section className={styles.categories}>
			<div className="container">
				<div className="row">
					{categories.map((category) => (
						<div key={category.id} className="col-md-4">
							<div className={styles.item}>
								<div className={styles.itemImage}>
									{category.image ? (
										<Image loader={loader} unoptimized={true} layout="fill" src={category.image.src} alt="" />
									) : null}
								</div>
								<div className={styles.itemText}>
									<h2 className={styles.itemTitle}>{category.name}</h2>
									<Link href={`/category/${category.slug}`}>
										<a className={styles.itemLink}>Shop now</a>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Categories;
