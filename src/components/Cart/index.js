import { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { removeFromCart, changeCart } from '../../utils/cart';
import { CartContext, TotalContext, DiscountContext } from '../';
import loader from '../../utils/loader';
import styles from './Cart.module.scss';

const Cart = (props) => {
	const [code, setCode] = useState('');
	const [cart, setCart] = useContext(CartContext);
	const [discount, setDiscount] = useContext(DiscountContext);
	const [total, setTotal] = useContext(TotalContext);
	const handlerChange = (event, product) => {
		changeCart({ ...product, quantity: parseInt(event.target.value) }, cart, setCart);
	};
	const changeCodeCoupon = (e) => {
		setCode(e.target.value);
	};
	const changeCoupon = async (code) => {
		const woocommerce = new WooCommerceRestApi({
			url: process.env.NEXT_PUBLIC_WORDPRESS_URL_SSL,
			consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
			consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
			version: 'wc/v3',
			axiosConfig: {
				headers: {
					'Content-Type': 'application/json',
				},
			},
		});
		const coupons = await woocommerce.get('coupons');
		const coupon = coupons.find((item) => item.code == code);
		if (coupon) {
			if (coupon.discount_type == 'percent') {
				setDiscount({ code: code, value: parseFloat(coupon.amount) });
			}
		}
	};
	return (
		<section className={styles.shoppingCart}>
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className={styles.cartTable}>
							<table>
								<thead>
									<tr>
										<th>Product</th>
										<th>Quantity</th>
										<th>Total</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{cart.map((product) => (
										<tr key={product.id}>
											<td className={styles.cartItem}>
												<div className={styles.cartItemImage}>
													<Image
														className={styles.image}
														loader={loader}
														unoptimized={true}
														src={product.images[0].src}
														layout="fill"
														alt={product.images[0].alt}
													/>
												</div>
												<div className={styles.cartItemText}>
													<h6>{product.name}</h6>
													<h5>${product.price}</h5>
												</div>
											</td>
											<td className={styles.quantityItem}>
												<div className={styles.quantity}>
													<input onChange={(e) => handlerChange(e, product)} type="number" value={product.quantity} />
												</div>
											</td>
											<td className={styles.cartPrice}>${product.quantity * product.price}</td>
											<td className={styles.cartClose} onClick={() => removeFromCart(product, cart, setCart)}></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className="col-lg-4">
						<div className={styles.cartTotal}>
							<h4>Cart total</h4>
							<input type="text" value={code} onChange={changeCodeCoupon} />
							<button onClick={() => changeCoupon(code)}>Coupone</button>
							<ul>
								<li>
									Total <span>$ {total}</span>
								</li>
							</ul>
							<Link href="/checkout">
								<a className={styles.checkoutBtn}>Proceed to checkout</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cart;
