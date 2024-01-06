import { FC, createContext, useContext, useRef, useMemo, useEffect, ReactNode } from 'react';

type DataType = {
	session: any;
	setSession: (user: any) => void;
};

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionContext = createContext<DataType>({
	session: {},
	setSession: (user: any) => {},
});

const SessionProvider: FC<SessionProviderProps> = (props) => {
	const session = useRef<any | null>(null);

	const setSession = async (user: any) => {
		session.current = user;
	};

	useEffect(() => {
		let userData: any = localStorage.getItem('next-user');
		if (!!userData && userData !== 'null' && userData !== '{}') {
			userData = JSON?.parse(userData);
			setSession(userData);
		} else {
			localStorage.setItem('next-user', JSON.stringify(session.current));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem('next-user', JSON.stringify(session.current));
	}, [session.current]);

	const val = useMemo(
		() => ({
			session: session.current || {},
			setSession,
		}),
		[session.current],
	);

	return (
		<>
			<SessionContext.Provider value={val}>{props.children}</SessionContext.Provider>
		</>
	);
};

export default SessionProvider;

export const useSession = () => {
	const context = useContext(SessionContext);
	return { ...context };
};
