import Image from 'next/image';
import Link from 'next/link';
import styles from './Categories.module.scss';
import loader from '../../utils/loader';
import { Grid } from 'ui-forest';

const Categories = (props) => {
	const { categories } = props;
	return (
		<section className={styles.categories}>
			<Grid>
				<Grid.Row>
					{categories.map((category) => (
						<Grid.Column key={category.id} md={4}>
							<div className={styles.categories__card}>
								<div className={styles.categories__image}>
									{category.image ? (
										<Image loader={loader} layout="fill" src={category.image.src} alt={category.name} />
									) : null}
								</div>
								<div className={styles.categories__content}>
									<Link href={`/category/${category.slug}`}>
										<a className={styles.categories__link}>{category.name}</a>
									</Link>
								</div>
							</div>
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</section>
	);
};
export default Categories;
