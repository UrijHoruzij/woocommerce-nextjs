import { FC, createContext, useContext, useRef, useMemo, useEffect, ReactNode } from 'react';

type DataType = {
	cart: any[];
	addToCart: (product: any) => void;
	changeCart: (product: any) => void;
	checkExistProduct: (product: any) => boolean;
	removeFromCart: (product: any) => void;
	clearCart: () => void;
};

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext<DataType>({
	cart: [],
	addToCart: (product: any) => {},
	changeCart: (product: any) => {},
	checkExistProduct: (product: any) => false,
	removeFromCart: (product: any) => {},
	clearCart: () => {},
});

const CartProvider: FC<CartProviderProps> = (props) => {
	const cart = useRef<any | undefined>(undefined);

	const addToCart = async (product: any) => {
		let newProduct = true;
		cart.current?.map((cartProduct: any) => {
			if (cartProduct.id === product.id) newProduct = false;
		});
		if (newProduct) {
			cart.current?.push(product);
			localStorage.setItem('next-cart', cart.current);
		}
	};
	const changeCart = (product: any) => {
		let newCart = cart.current?.map((cartProduct: any) => {
			if (cartProduct.id === product.id) {
				cartProduct.quantity = product.quantity;
			}
		});
		cart.current = newCart;
	};

	const checkExistProduct = (product: any) => {
		let flag = false;
		cart.current.map((cartProduct: any) => {
			if (cartProduct.id === product.id) flag = true;
		});
		return flag;
	};
	const removeFromCart = (product: any) => {
		let newCart = cart.current?.filter((cartProduct: any) => {
			return cartProduct.id !== product.id;
		});
		cart.current = newCart;
	};
	const clearCart = () => {
		cart.current = [];
	};

	useEffect(() => {
		const cartStorageData = localStorage.getItem('next-cart');
		if (cartStorageData !== null && cartStorageData !== '[]') {
			const cartData = JSON.parse(cartStorageData);
			cart.current = cartData;
		} else {
			localStorage.setItem('next-cart', JSON.stringify(cart.current));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('next-cart', JSON.stringify(cart.current));
	}, [cart.current]);

	const val = useMemo(
		() => ({
			cart: cart.current || [],
			addToCart,
			changeCart,
			checkExistProduct,
			removeFromCart,
			clearCart,
		}),
		[cart.current],
	);

	return (
		<>
			<CartContext.Provider value={val}>{props.children}</CartContext.Provider>
		</>
	);
};

export default CartProvider;

export const useCart = () => {
	const context = useContext(CartContext);
	return { ...context };
};
