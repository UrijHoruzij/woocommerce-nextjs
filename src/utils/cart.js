export const addToCart = (product, cart, setCart) => {
	let newProduct = true;
	cart.map((cartProduct) => {
		if (cartProduct.id === product.id) {
			newProduct = false;
		}
	});
	if (newProduct) {
		let clone = [...cart];
		clone.push(product);
		setCart(clone);
	}
};
export const changeCart = (product, cart, setCart) => {
	let newCart = [...cart];
	newCart.map((cartProduct) => {
		if (cartProduct.id === product.id) {
			cartProduct.quantity = product.quantity;
		}
	});
	setCart(newCart);
};
export const removeFromCart = (product, cart, setCart) => {
	let newCart = cart.filter((cartProduct) => {
		return cartProduct.id !== product.id;
	});
	setCart(newCart);
};
