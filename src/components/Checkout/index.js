import { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext, TotalContext, DiscountContext } from '../';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import styles from './Checkout.module.scss';

const Checkout = (props) => {
	const router = useRouter();
	const [cart, setCart] = useContext(CartContext);
	const [discount, setDiscount] = useContext(DiscountContext);
	const [total, setTotal] = useContext(TotalContext);
	const changeTotal = (total) => {
		if (discount.value) return total - (total * discount.value) / 100;
		return total;
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
			shipping_lines: [
				{
					method_id: 'flat_rate',
					method_title: 'Flat Rate',
					total: '10.00',
				},
			],
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
		<section className="checkout">
			<div className="container">
				<div className={styles.checkout__form}>
					<form onSubmit={processOrder}>
						<div className="row">
							<div className="col-lg-8 col-md-6">
								<h4 className={styles.checkoutTitle}>Billing Details</h4>
								<div className="row">
									<div className="col-lg-6">
										<div className={styles.checkoutInput}>
											<p>
												Fist Name<span>*</span>
											</p>
											<input type="text" name="firstName" />
										</div>
									</div>
									<div className="col-lg-6">
										<div className={styles.checkoutInput}>
											<p>
												Last Name<span>*</span>
											</p>
											<input type="text" name="lastName" />
										</div>
									</div>
								</div>
								<div className={styles.checkoutInput}>
									<p>
										Country<span>*</span>
									</p>
									<input type="text" name="country" />
								</div>
								<div className={styles.checkoutInput}>
									<p>
										Address<span>*</span>
									</p>
									<input type="text" placeholder="Street Address" name="street" className={styles.checkoutInput__add} />
									<input type="text" placeholder="Apartment, suite, unite ect (optinal)" name="apartment" />
								</div>
								<div className={styles.checkoutInput}>
									<p>
										Town/City<span>*</span>
									</p>
									<input type="text" name="city" />
								</div>
								<div className={styles.checkoutInput}>
									<p>
										Country/State<span>*</span>
									</p>
									<input type="text" name="state" />
								</div>
								<div className={styles.checkoutInput}>
									<p>
										Postcode / ZIP<span>*</span>
									</p>
									<input type="text" name="postcode" />
								</div>
								<div className="row">
									<div className="col-lg-6">
										<div className={styles.checkoutInput}>
											<p>
												Phone<span>*</span>
											</p>
											<input type="text" name="phone" />
										</div>
									</div>
									<div className="col-lg-6">
										<div className={styles.checkoutInput}>
											<p>
												Email<span>*</span>
											</p>
											<input type="text" name="email" />
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className={styles.checkoutOrder}>
									<h4 className={styles.orderTitle}>Your order</h4>
									<div className={styles.checkoutOrderProducts}>
										Product <span>Total</span>
									</div>
									<ul className={styles.checkoutTotalProducts}>
										{cart.map((product) => (
											<li key={product.id}>
												{product.name}
												<span>$ {product.quantity * product.price}</span>
											</li>
										))}
									</ul>
									{discount.value > 0 ? <div className="checkout__discount">{discount.value}%</div> : null}
									<div className={styles.checkoutShipping}>
										Shipping <span className={styles.shippingPrice}>$10</span>
									</div>
									<div className={styles.checkoutTotalAll}>
										Total <span className={styles.total}>${changeTotal(total + 10)}</span>
									</div>
									<button type="submit" className={styles.placeBtn}>
										PLACE ORDER
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
