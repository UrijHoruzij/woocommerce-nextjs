import { useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { SIGNUP } from '../../utils/endpoints';
import { UserContext } from '../';
import loader from '../../utils/loader';
import styles from './SignUp.module.scss';
const SignUp = (props) => {
	const [user, setUser] = useContext(UserContext);
	const processSignUp = async (e) => {
		e.preventDefault();
		const data = {
			username: e.target.username.value,
			email: e.target.email.value,
			password: e.target.password.value,
		};
		const userData = await axios.post(SIGNUP, data);
		setUser(userData.data);
	};
	return (
		<section className={styles.signUp}>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<form onSubmit={processSignUp} className={styles.signUp__form}>
							<input className={styles.signUp__input} placeholder="username" name="username" type="text" />
							<input className={styles.signUp__input} placeholder="email" name="email" type="email" />
							<input className={styles.signUp__input} placeholder="password" name="password" type="password" />
							<Link href={'/signin'}>
								<a className={styles.signUp__link}>Sign in</a>
							</Link>
							<button className={styles.signUp__btn} type="submit">
								Sign up
							</button>
						</form>
					</div>
					<div className="col-md-6">
						<div className={styles.signUp__image}>
							<Image layout="fill" loader={loader} src="/images/signup.jpg" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default SignUp;
