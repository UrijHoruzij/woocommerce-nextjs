import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Products.module.scss';
import loader from '../../utils/loader';
import { addToCart } from '../../utils/cart';
import { CartContext } from '../';
import { Grid } from 'ui-forest';

const Products = (props) => {
	const { products, title } = props;
	const [cart, setCart] = useContext(CartContext);
	const changePercent = (price, regularPrice) => {
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
					{products.map((product) => (
						<Grid.Column key={product.id} lg={3} md={6}>
							<div className={styles.card}>
								<figure className={styles.card__image}>
									<Link href={`/product/${product.slug}`}>
										<a>
											<Image
												loader={loader}
												unoptimized={true}
												src={product.images[0].src}
												layout="fill"
												alt={product.images[0].alt}
											/>
										</a>
									</Link>
									{product.regular_price !== '' && product.regular_price != product.price ? (
										<div className={styles.card__badge}>{changePercent(product.price, product.regular_price)}</div>
									) : null}
									<div className={styles.card__actions}>
										<button
											onClick={() => addToCart({ quantity: 1, ...product }, cart, setCart)}
											className={styles.card__actionBtn}>
											Add to Cart
										</button>
									</div>
								</figure>
								<div className={styles.card__content}>
									<Link href={`/product/${product.slug}`}>
										<a className={styles.card__title}>{product.name}</a>
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
