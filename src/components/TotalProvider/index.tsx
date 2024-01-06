import { FC, createContext, useContext, useRef, useMemo, useEffect, ReactNode } from 'react';
import { useCart } from '../CartProvider';

type DataType = {
	total: number;
	setTotal: (total: number) => void;
};

interface TotalProviderProps {
	children: ReactNode;
}

export const TotalContext = createContext<DataType>({
	total: 0,
	setTotal: (total: number) => {},
});

const TotalProvider: FC<TotalProviderProps> = (props) => {
	const total = useRef<any | null>(null);
	const { cart } = useCart();

	const setTotal = (sum: number) => {
		total.current = sum;
	};

	useEffect(() => {
		const cartStorageData = localStorage.getItem('next-cart');
		if (!!cartStorageData && cartStorageData !== 'null' && cartStorageData !== '[]') {
			const cartData = JSON.parse(cartStorageData);
			const sum = cartData?.reduce((acc: number, product: any) => {
				return acc + parseFloat((product.price * product.quantity).toString());
			}, 0);
			setTotal(Number(sum?.toFixed(2)));
		}
	}, []);

	useEffect(() => {
		const sum = cart?.reduce((acc: number, product: any) => {
			return acc + parseFloat((product.price * product.quantity).toString());
		}, 0);
		setTotal(Number(sum?.toFixed(2) || 0));
	}, [cart]);

	const val = useMemo(
		() => ({
			total: total.current || 0,
			setTotal,
		}),
		[total.current],
	);

	return (
		<>
			<TotalContext.Provider value={val}>{props.children}</TotalContext.Provider>
		</>
	);
};

export default TotalProvider;

export const useTotal = () => {
	const context = useContext(TotalContext);
	return { ...context };
};
