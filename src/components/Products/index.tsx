import { useContext, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Products.module.scss';
import loader from '../../utils/loader';
import { useCart } from '../CartProvider';
import { Grid } from 'ui-forest';

interface ProductsProps {
	products: any[];
	title: string;
}

const Products: FC<ProductsProps> = (props) => {
	const { products, title } = props;
	const { addToCart } = useCart();
	const changePercent = (price: any, regularPrice: any) => {
		if (regularPrice !== '' && regularPrice !== price) {
			const percent = 100 - (parseFloat(price) / parseFloat(regularPrice)) * 100;
			return `-${percent.toFixed()}%`;
		}
	};
	return (
		<section className={styles.product}>
			<Grid>
				<h2 className={styles.sectionTitle}>{title}</h2>
				<Grid.Row>
					{products.map((product: any) => (
						<Grid.Column key={product.id} lg={3} md={6}>
							<div className={styles.card}>
								<figure className={styles.card__image}>
									<Link href={`/product/${product.slug}`}>
										<Image
											loader={loader}
											unoptimized={true}
											src={product.images[0].src}
											layout="fill"
											alt={product.images[0].alt}
										/>
									</Link>
									{product.regular_price !== '' && product.regular_price != product.price ? (
										<div className={styles.card__badge}>{changePercent(product.price, product.regular_price)}</div>
									) : null}
									<div className={styles.card__actions}>
										<button onClick={() => addToCart({ quantity: 1, ...product })} className={styles.card__actionBtn}>
											Add to Cart
										</button>
									</div>
								</figure>
								<div className={styles.card__content}>
									<Link className={styles.card__title} href={`/product/${product.slug}`}>
										{product.name}
									</Link>
									<div className={styles.card__price}>
										<span>${product.price}</span>
										{product.regular_price !== '' ? <span>${product.regular_price}</span> : null}
									</div>
								</div>
							</div>
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</section>
	);
};
export default Products;
