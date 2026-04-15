import { useState, FC, ChangeEvent } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import loader from '../../utils/loader';
import styles from './Product.module.scss';
import { useCart } from '../CartProvider';

import { Grid } from 'ui-forest';

interface ProductProps {
	product: any;
}

const Product: FC<ProductProps> = (props) => {
	const { product } = props;
	const [preview, setPreview] = useState(product.images[0].src);
	const [count, setCount] = useState(1);

	const { checkExistProduct, changeCart, addToCart } = useCart();

	const changePreview = (url: string) => {
		setPreview(url);
	};
	const changeCount = (e: ChangeEvent<HTMLInputElement>) => {
		setCount(parseInt(e.target.value));
	};
	const addProduct = () => {
		if (checkExistProduct(product)) {
			changeCart({ quantity: count, ...product });
			return;
		}
		addToCart({ quantity: count, ...product });
	};
	return (
		<div className={styles.product}>
			<Grid>
				<Grid.Row>
					<Grid.Column md={6}>
						<div className="product__images">
							<div className={styles.product__preview}>
								<Image
									// layout="fill"
									width={300}
									height={300}
									unoptimized
									loader={loader}
									src={preview}
									alt={product.name}
								/>
							</div>
							{product.images.length >= 2 ? (
								<div className={styles.product__gallery}>
									{product.images.slice(0, 4).map((image: any) => (
										<div
											key={image.id}
											onClick={() => changePreview(image.src)}
											className={styles.product__galleryItem}>
											<Image
												width={300}
												height={300}
												unoptimized
												//  layout="fill"
												loader={loader}
												src={image.src}
												alt={image.alt}
											/>
										</div>
									))}
								</div>
							) : null}
						</div>
					</Grid.Column>
					<Grid.Column md={6}>
						<div className="product__content">
							<h3 className={styles.product__name}>{product.name}</h3>
							<div className={styles.product__price}>${product.price}</div>
							<p className={styles.product__description}>{parse(product.description)}</p>
							{product.categories.length > 0 ? (
								<div className={styles.product__categories}>
									<span className={styles.product__metaTitle}>Categories:</span>
									{product.categories.map((category: any) => (
										<p key={category.id}>{category.name}</p>
									))}
								</div>
							) : null}
							<div className={styles.product__cart}>
								<input className={styles.product__count} value={count} type="number" onChange={changeCount} />
								<button className={styles.product__btn} onClick={addProduct}>
									Add to cart
								</button>
							</div>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	);
};
export default Product;
