import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext, TotalContext, DiscountContext } from '../';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import styles from './Checkout.module.scss';

const Checkout = (props) => {
	const { shipping } = props;
	const router = useRouter();
	const [cart, setCart] = useContext(CartContext);
	const [discount, setDiscount] = useContext(DiscountContext);
	const [total, setTotal] = useContext(TotalContext);
	const [shippingPrice, setShippingPrice] = useState(0);
	const changeShipping = (e) => {
		if (e.target.value === 'flat_rate') {
			setShippingPrice(10);
		} else {
			setShippingPrice(0);
		}
	};
	const changeTotal = (total) => {
		total = parseFloat(total);
		if (discount.value) return total - (total * discount.value) / 100;
		return total + shippingPrice;
	};
	const processOrder = async (e) => {
		e.preventDefault();
		const items = [];
		cart.map((product) => {
			items.push({
				product_id: product.id,
				quantity: product.quantity,
			});
		});
		const shippingMethod = {
			method_id: e.target.shipping.value,
		};
		if (e.target.shipping.value === 'flat_rate') {
			shippingMethod.total = '10.00';
		}
		const data = {
			payment_method: 'cod',
			payment_method_title: 'Cash on delivery',
			set_paid: false,
			billing: {
				first_name: e.target.firstName.value,
				last_name: e.target.lastName.value,
				address_1: e.target.street.value,
				address_2: e.target.apartment.value,
				city: e.target.city.value,
				state: e.target.state.value,
				postcode: e.target.postcode.value,
				country: e.target.country.value,
				email: e.target.email.value,
				phone: e.target.phone.value,
			},
			shipping: {
				first_name: e.target.firstName.value,
				last_name: e.target.lastName.value,
				address_1: e.target.street.value,
				address_2: e.target.apartment.value,
				city: e.target.city.value,
				state: e.target.state.value,
				postcode: e.target.postcode.value,
				country: e.target.country.value,
			},
			line_items: items,
			shipping_lines: [shippingMethod],
			coupon_lines: [
				{
					code: discount.code,
				},
			],
		};
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
		await woocommerce.post('orders', data);
		setCart([]);
		setDiscount({});
		setTotal(0);
		router.push('/thank-you');
	};

	return (
		<section className={styles.checkout}>
			<div className="container">
				<div className={styles.checkout__form}>
					<form onSubmit={processOrder}>
						<div className="row">
							<div className="col-lg-8 col-md-6">
								<h4 className={styles.checkout__title}>Billing Details</h4>
								<div className="row">
									<div className="col-lg-6">
										<label className={styles.checkout__label}>
											<p>
												Fist Name<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="firstName" />
										</label>
									</div>
									<div className="col-lg-6">
										<label className={styles.checkout__label}>
											<p>
												Last Name<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="lastName" />
										</label>
									</div>
								</div>
								<label className={styles.checkout__label}>
									<p>
										Country<span>*</span>
									</p>
									<input className={styles.checkout__input} type="text" name="country" />
								</label>
								<label className={styles.checkout__label}>
									<p>
										Address<span>*</span>
									</p>
									<input type="text" placeholder="Street Address" name="street" className={styles.checkout__input} />
									<input
										type="text"
										placeholder="Apartment, suite, unite ect (optinal)"
										name="apartment"
										className={styles.checkout__input}
									/>
								</label>
								<label className={styles.checkout__label}>
									<p>
										Town/City<span>*</span>
									</p>
									<input className={styles.checkout__input} type="text" name="city" />
								</label>
								<label className={styles.checkout__label}>
									<p>
										Country/State<span>*</span>
									</p>
									<input className={styles.checkout__input} type="text" name="state" />
								</label>
								<label className={styles.checkout__label}>
									<p>
										Postcode / ZIP<span>*</span>
									</p>
									<input className={styles.checkout__input} type="text" name="postcode" />
								</label>
								<div className="row">
									<div className="col-lg-6">
										<label className={styles.checkout__label}>
											<p>
												Phone<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="phone" />
										</label>
									</div>
									<div className="col-lg-6">
										<label className={styles.checkout__label}>
											<p>
												Email<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="email" />
										</label>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className={styles.checkout__order}>
									<h4 className={styles.checkout__orderTitle}>Your order</h4>
									<div className={styles.checkout__orderTable}>
										<div className={styles.checkout__orderTableTitle}>
											<span>Product</span>
											<span>Total</span>
										</div>
										{cart.map((product) => (
											<div className={styles.checkout__orderTableRow} key={product.id}>
												<span>{product.name}</span>
												<span>$ {product.quantity * product.price}</span>
											</div>
										))}
									</div>
									{discount.value > 0 ? (
										<div className={styles.checkout__discount}>
											<span className={styles.checkout__discountTitle}>Discount:</span>
											<span>{discount.value}%</span>
										</div>
									) : null}
									<div className={styles.checkout__shipping}>
										<span className={styles.checkout__shippingTitle}>Shipping:</span>
										{shipping.map((method) => (
											<label className={styles.checkout__shippingLabel} key={method.id}>
												{method.title} {method.id === 'flat_rate' ? '$10' : null}
												<input
													className={styles.checkout__shippingInput}
													onChange={changeShipping}
													value={method.id}
													type="radio"
													name="shipping"
												/>
											</label>
										))}
									</div>
									<div className={styles.checkout__total}>
										<span className={styles.checkout__totalTitle}>Total:</span>
										<span className={styles.checkout__totalPrice}>${changeTotal(total)}</span>
									</div>
									<button type="submit" className={styles.checkout__btn}>
										Place order
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Checkout;
