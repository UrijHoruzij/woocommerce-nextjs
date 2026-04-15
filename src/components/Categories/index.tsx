import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import loader from '../../utils/loader';
import { Grid } from 'ui-forest';
import styles from './Categories.module.scss';

interface CategoriesProps {
	categories: any;
}
const Categories: FC<CategoriesProps> = (props) => {
	const { categories } = props;
	return (
		<section className={styles.categories}>
			<Grid>
				<Grid.Row>
					{categories.map((category: any) => (
						<Grid.Column key={category.id} md={4}>
							<div className={styles.categories__card}>
								<div className={styles.categories__image}>
									{category.image ? (
										<Image
											loader={loader}
											unoptimized
											width={300}
											height={300}
											src={category.image.src}
											alt={category.name}
										/>
									) : null}
								</div>
								<div className={styles.categories__content}>
									<Link className={styles.categories__link} href={`/category/${category.slug}`}>
										{category.name}
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
