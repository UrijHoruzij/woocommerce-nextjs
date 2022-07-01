import { useState, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { SIGNIN, SIGNUP } from '../../utils/endpoints';
import { UserContext } from '../';
import loader from '../../utils/loader';

import styles from './Auth.module.scss';
const Auth = (props) => {
	const [user, setUser] = useContext(UserContext);
	const [visibleSignUp, setVisibleSignUp] = useState(false);
	const processSignIn = async (e) => {
		e.preventDefault();
		const data = {
			username: e.target.username.value,
			password: e.target.password.value,
		};
		const userData = await axios.post(SIGNIN, data);
		setUser(userData.data);
		// router.push('/thank-you');
	};
	const processSignUp = async (e) => {
		e.preventDefault();
		const data = {
			username: e.target.username.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};
		const userData = await axios.post(SIGNUP, data);
		setUser(userData.data);
		setVisibleSignUp(true);
	};
	return (
		<section className={styles.auth}>
			<div className="container">
				<div className={styles.auth__card}>
					<div className={styles.auth__image}>
						<Image layout="fill" loader={loader} src="/images/signin.jpg" />
					</div>
					<form onSubmit={processSignIn}>
						<input placeholder="username" name="username" type="text" />
						<input placeholder="password" name="password" type="password" />
						<button type="submit">login</button>
					</form>
				</div>
				<div className={styles.auth__card}>
					<form onSubmit={processSignUp}>
						<input placeholder="username" name="username" type="text" />
						<input placeholder="email" name="email" type="email" />
						<input placeholder="password" name="password" type="password" />
						<button type="submit">registration</button>
					</form>
					<div className={styles.auth__image}>
						<Image layout="fill" loader={loader} src="/images/signup.jpg" />
					</div>
				</div>
			</div>
		</section>
	);
};
export default Auth;
