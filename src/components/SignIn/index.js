import { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { SIGNIN } from '../../utils/endpoints';
import { UserContext } from '../';
import loader from '../../utils/loader';
import styles from './SignIn.module.scss';

const SignIn = (props) => {
	const router = useRouter();
	const [user, setUser] = useContext(UserContext);
	const processSignIn = async (e) => {
		e.preventDefault();
		const data = {
			username: e.target.username.value,
			password: e.target.password.value,
		};
		const userData = await axios.post(SIGNIN, data);
		setUser({ ...userData.data });
		router.push('/');
	};

	return (
		<section className={styles.signIn}>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className={styles.signIn__image}>
							<Image layout="fill" loader={loader} src="/images/signin.jpg" />
						</div>
					</div>
					<div className="col-md-6">
						<form onSubmit={processSignIn} className={styles.signIn__form}>
							<input className={styles.signIn__input} placeholder="username" name="username" type="text" />
							<input className={styles.signIn__input} placeholder="password" name="password" type="password" />
							<Link href={'/signup'}>
								<a className={styles.signIn__link}>Sign up</a>
							</Link>
							<button className={styles.signIn__btn} type="submit">
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
export default SignIn;
