import { FC, createContext, useContext, useRef, useMemo, ReactNode } from 'react';

type DataType = {
	discount: any;
	addDiscount: (discount: any) => void;
};

interface DiscountProviderProps {
	children: ReactNode;
}

export const DiscountContext = createContext<DataType>({
	discount: {},
	addDiscount: (product: any) => {},
});

const DiscountProvider: FC<DiscountProviderProps> = (props) => {
	const discount = useRef<any | undefined>(undefined);

	const addDiscount = async (product: any) => {
		discount.current = product;
	};

	const val = useMemo(
		() => ({
			discount: discount.current || { value: 0 },
			addDiscount,
		}),
		[discount.current],
	);

	return (
		<>
			<DiscountContext.Provider value={val}>{props.children}</DiscountContext.Provider>
		</>
	);
};

export default DiscountProvider;

export const useDiscount = () => {
	const context = useContext(DiscountContext);
	return { ...context };
};
