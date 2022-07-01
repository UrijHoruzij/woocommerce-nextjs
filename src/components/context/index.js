import React, { useState, useEffect } from 'react';
import { CartContext, TotalContext, DiscountContext, UserContext } from '../';

const CartProvider = (props) => {
	const [cart, setCart] = useState([]);
	const [discount, setDiscount] = useState({});
	const [total, setTotal] = useState(0);
	const [user, setUser] = useState({});
	useEffect(() => {
		let cartData = localStorage.getItem('next-cart');
		if (cartData !== null && cartData !== '[]') {
			cartData = JSON.parse(cartData);
			let tempTotal = 0;
			cartData.map((product) => {
				tempTotal += parseFloat(product.price * product.quantity);
			});
			setTotal(tempTotal.toFixed(2));
			setCart(cartData);
		} else {
			localStorage.setItem('next-cart', JSON.stringify(cart));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem('next-cart', JSON.stringify(cart));
		let tempTotal = 0;
		cart.map((product) => {
			tempTotal += parseFloat(product.price * product.quantity);
		});
		setTotal(tempTotal.toFixed(2));
	}, [cart]);
	return (
		<UserContext.Provider value={[user, setUser]}>
			<CartContext.Provider value={[cart, setCart]}>
				<DiscountContext.Provider value={[discount, setDiscount]}>
					<TotalContext.Provider value={[total, setTotal]}>{props.children}</TotalContext.Provider>
				</DiscountContext.Provider>
			</CartContext.Provider>
		</UserContext.Provider>
	);
};
export default CartProvider;
