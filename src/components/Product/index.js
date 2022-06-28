import { useState, useContext } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import loader from '../../utils/loader';
import styles from './Product.module.scss';
import { addToCart, checkExistProduct, changeCart } from '../../utils/cart';
import { CartContext } from '../';

const Product = (props) => {
	const { product } = props;
	const [preview, setPreview] = useState(product.images[0].src);
	const [count, setCount] = useState(1);
	const [cart, setCart] = useContext(CartContext);
	const changePreview = (url) => {
		setPreview(url);
	};
	const changeCount = (e) => {
		setCount(parseInt(e.target.value));
	};
	const addProduct = () => {
		if (checkExistProduct(product, cart)) {
			changeCart({ quantity: count, ...product }, cart, setCart);
		} else {
			addToCart({ quantity: count, ...product }, cart, setCart);
		}
	};
	return (
		<div className={styles.product}>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="product__images">
							<div className={styles.product__preview}>
								<Image layout="fill" loader={loader} src={preview} alt={product.name} />
							</div>
							{product.images.length >= 2 ? (
								<div className={styles.product__gallery}>
									{product.images.slice(0, 4).map((image) => (
										<div
											key={image.id}
											onClick={() => changePreview(image.src)}
											className={styles.product__galleryItem}>
											<Image layout="fill" loader={loader} src={image.src} alt={image.alt} />
										</div>
									))}
								</div>
							) : null}
						</div>
					</div>
					<div className="col-md-6">
						<div className="product__content">
							<h3 className={styles.product__name}>{product.name}</h3>
							<div className={styles.product__price}>${product.price}</div>
							<p className={styles.product__description}>{parse(product.description)}</p>
							{product.categories.length > 0 ? (
								<div className={styles.product__categories}>
									<span className={styles.product__metaTitle}>Categories:</span>
									{product.categories.map((category) => (
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

							{/* {product.attributes.length > 0 ? (
								<div className={styles.product__attributes}>
									<span className={styles.product__metaTitle}>Attributes:</span>
									{product.attributes.map((attribute) => (
										<div key={attribute.id}>
											<p>{attribute.name}</p>
											<select>
												{attribute.options.map((option, index) => (
													<option key={index} value={option}>
														{option}
													</option>
												))}
											</select>
										</div>
									))}
								</div>
							) : null} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Product;
