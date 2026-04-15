import { useState, FC, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../CartProvider';
import { useDiscount } from '../DiscountProvider';
import { useTotal } from '../TotalProvider';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Grid } from 'ui-forest';
import styles from './Checkout.module.scss';

interface CheckoutProps {
	shipping: any[];
}

const Checkout: FC<CheckoutProps> = (props) => {
	const { shipping } = props;
	const router = useRouter();
	const { cart, clearCart } = useCart();
	const { discount, addDiscount } = useDiscount();
	const { total, setTotal } = useTotal();
	const [shippingPrice, setShippingPrice] = useState(0);
	const changeShipping = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'flat_rate') {
			setShippingPrice(10);
		} else {
			setShippingPrice(0);
		}
	};
	const changeTotal = (total: string) => {
		const sum = parseFloat(total);
		if (discount.value) return sum - (sum * discount.value) / 100;
		return sum + shippingPrice;
	};
	const processOrder = async (e: any) => {
		e.preventDefault();
		const items: any[] = [];
		cart.map((product: any) => {
			items.push({
				product_id: product.id,
				quantity: product.quantity,
			});
		});
		const shippingMethod: {
			method_id: number | string;
			total?: string;
		} = {
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
		clearCart();
		addDiscount({ value: 0 });
		setTotal(0);
		router.push('/thank-you');
	};

	return (
		<section className={styles.checkout}>
			<Grid>
				<div className={styles.checkout__form}>
					<form onSubmit={processOrder}>
						<Grid.Row>
							<Grid.Column lg={8} md={6}>
								<h4 className={styles.checkout__title}>Billing Details</h4>
								<Grid.Row>
									<Grid.Column lg={6}>
										<label className={styles.checkout__label}>
											<p>
												Fist Name<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="firstName" />
										</label>
									</Grid.Column>
									<Grid.Column lg={6}>
										<label className={styles.checkout__label}>
											<p>
												Last Name<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="lastName" />
										</label>
									</Grid.Column>
								</Grid.Row>
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
								<Grid.Row>
									<Grid.Column lg={6}>
										<label className={styles.checkout__label}>
											<p>
												Phone<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="phone" />
										</label>
									</Grid.Column>
									<Grid.Column lg={6}>
										<label className={styles.checkout__label}>
											<p>
												Email<span>*</span>
											</p>
											<input className={styles.checkout__input} type="text" name="email" />
										</label>
									</Grid.Column>
								</Grid.Row>
							</Grid.Column>
							<Grid.Column lg={4} md={6}>
								<div className={styles.checkout__order}>
									<h4 className={styles.checkout__orderTitle}>Your order</h4>
									<div className={styles.checkout__orderTable}>
										<div className={styles.checkout__orderTableTitle}>
											<span>Product</span>
											<span>Total</span>
										</div>
										{cart.map((product: any) => (
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
										{shipping.map((method: any) => (
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
										<span className={styles.checkout__totalPrice}>${changeTotal(total.toString())}</span>
									</div>
									<button type="submit" className={styles.checkout__btn}>
										Place order
									</button>
								</div>
							</Grid.Column>
						</Grid.Row>
					</form>
				</div>
			</Grid>
		</section>
	);
};

export default Checkout;
