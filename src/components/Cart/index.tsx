import { useState, FC, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { useCart } from '../CartProvider';
import { useDiscount } from '../DiscountProvider';
import { useTotal } from '../TotalProvider';
import loader from '../../utils/loader';
import { Grid } from 'ui-forest';
import styles from './Cart.module.scss';

const Cart: FC = (props) => {
	const [code, setCode] = useState<string>('');
	const { cart, removeFromCart, changeCart } = useCart();
	const { discount, addDiscount } = useDiscount();
	const { total } = useTotal();
	const changeTotal = () => {
		if (discount.value) return total - (total * discount.value) / 100;
		return total;
	};
	const changeQuantity = (event: ChangeEvent<HTMLInputElement>, product: any) => {
		if (parseInt(event.target.value) > 0) changeCart({ ...product, quantity: parseInt(event.target.value) });
		if (parseInt(event.target.value) === 0) removeFromCart(product);
	};
	const changeCodeCoupon = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};
	const changeCoupon = async (code: string) => {
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
		const coupon = coupons.find((item: any) => item.code == code);
		if (coupon && coupon.discount_type == 'percent') {
			addDiscount({ code: code, value: parseFloat(coupon.amount) });
		}
	};
	return (
		<section className={styles.cart}>
			<Grid>
				<Grid.Row>
					{cart.length > 0 ? (
						<>
							<Grid.Column lg={8}>
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
											{cart.map((product: any) => (
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
													<td className={styles.cart__close} onClick={() => removeFromCart(product)}></td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</Grid.Column>
							<Grid.Column lg={4}>
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
										<span className={styles.cart__totalDiscount}>$ {changeTotal()}</span>
									</div>
									<Link className={styles.cart__btn} href="/checkout">
										Proceed to checkout
									</Link>
								</div>
							</Grid.Column>
						</>
					) : (
						<Grid.Column col={12}></Grid.Column>
					)}
				</Grid.Row>
			</Grid>
		</section>
	);
};

export default Cart;
