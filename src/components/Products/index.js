import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Products.module.scss';
import loader from '../../utils/loader';
import { addToCart } from '../../utils/cart';
import { CartContext } from '../';

const Products = (props) => {
	const { products } = props;
	const [cart, setCart] = useContext(CartContext);
	return (
		<section className={styles.product}>
			<div className="container">
				<div className="row">
					{products.map((product) => (
						<div key={product.id} className="col-lg-3 col-md-6 col-sm-6">
							<div className={styles.productItem}>
								<div className={styles.productImage}>
									<Image
										className={styles.image}
										loader={loader}
										unoptimized={true}
										src={product.images[0].src}
										layout="fill"
										alt={product.images[0].alt}
									/>
									<span className={styles.label}>New</span>
								</div>
								<div className={styles.text}>
									<Link href={`/product/${product.slug}`}>
										<a className={styles.name}>{product.name}</a>
									</Link>
									<h4 className={styles.price}>${product.price}</h4>
									<button className={styles.btn} onClick={() => addToCart({ quantity: 1, ...product }, cart, setCart)}>
										Add To Cart
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default Products;
