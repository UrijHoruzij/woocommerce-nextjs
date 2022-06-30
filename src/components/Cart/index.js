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
	const changeTotal = (total) => {
		if (discount.value) return total - (total * discount.value) / 100;
		return total;
	};
	const changeQuantity = (event, product) => {
		if (parseInt(event.target.value) > 0)
			changeCart({ ...product, quantity: parseInt(event.target.value) }, cart, setCart);
		if (parseInt(event.target.value) === 0) removeFromCart(product, cart, setCart);
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
		<section className={styles.cart}>
			<div className="container">
				<div className="row">
					{cart.length > 0 ? (
						<>
							<div className="col-lg-8">
								<div className={styles.cart__table}>
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
													<td className={styles.cart__item}>
														<div className={styles.cart__image}>
															<Image
																loader={loader}
																unoptimized={true}
																src={product.images[0].src}
																layout="fill"
																alt={product.images[0].alt}
															/>
														</div>
														<div className={styles.cart__content}>
															<h6 className={styles.cart__name}>{product.name}</h6>
															<h5 className={styles.cart__price}>${product.price}</h5>
														</div>
													</td>
													<td className={styles.cart__quantity}>
														<input
															className={styles.cart__quantityInput}
															onChange={(e) => changeQuantity(e, product)}
															type="number"
															value={product.quantity}
														/>
													</td>
													<td className={styles.cart__productPrice}>
														${(product.quantity * product.price).toFixed(2)}
													</td>
													<td
														className={styles.cart__close}
														onClick={() => removeFromCart(product, cart, setCart)}></td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="col-lg-4">
								<div className={styles.cart__coupone}>
									<h4 className={styles.cart__title}>Coupone</h4>
									<div className={styles.cart__couponeContent}>
										<input className={styles.cart__couponeInput} type="text" value={code} onChange={changeCodeCoupon} />
										<button className={styles.cart__couponeBtn} onClick={() => changeCoupon(code)}>
											Coupone
										</button>
									</div>
								</div>
								<div className={styles.cart__total}>
									<h4 className={styles.cart__title}>Cart total</h4>
									{discount.length > 0 ? (
										<div className={styles.cart__discount}>Discount: -{discount.value}%</div>
									) : null}
									<div className={styles.cart__totalPrice}>
										Total: <span className={styles.cart__totalSumma}>$ {total}</span>
										<span className={styles.cart__totalDiscount}>$ {changeTotal(total)}</span>
									</div>
									<Link href="/checkout">
										<a className={styles.cart__btn}>Proceed to checkout</a>
									</Link>
								</div>
							</div>
						</>
					) : (
						<div className="col-12"></div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Cart;
