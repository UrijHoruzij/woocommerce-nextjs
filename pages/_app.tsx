import React from 'react';
import 'normalize.css';
import '../src/styles/Global.scss';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
