import React, { useState, useEffect } from 'react';
import { CartContext, TotalContext } from '../';

const CartProvider = (props) => {
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		let cartData = localStorage.getItem('next-cart');
		if (cartData !== null && cartData !== '[]') {
			cartData = JSON.parse(cartData);
			let tempTotal = 0;
			cartData.map((product) => {
				tempTotal += parseFloat(product.price * product.quantity);
			});
			setTotal(tempTotal);
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
		setTotal(tempTotal);
	}, [cart]);
	return (
		<CartContext.Provider value={[cart, setCart]}>
			<TotalContext.Provider value={[total, setTotal]}>{props.children}</TotalContext.Provider>
		</CartContext.Provider>
	);
};
export default CartProvider;
