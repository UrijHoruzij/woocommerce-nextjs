import { FC } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { SIGNIN } from '../../utils/endpoints';
import loader from '../../utils/loader';
import { useSession } from '../SessionProvider';
import styles from './SignIn.module.scss';
import { Button, Grid, Input } from 'ui-forest';

const SignIn: FC = () => {
	const router = useRouter();
	const { setSession } = useSession();
	const processSignIn = async (e: any) => {
		e.preventDefault();
		const data = {
			username: e.target.username.value,
			password: e.target.password.value,
		};
		try {
			const userData = await axios.post(SIGNIN, data);
			setSession({ ...userData.data });
			router.push('/');
		} catch (error) {}
	};

	return (
		<section className={styles.signIn}>
			<Grid>
				<Grid.Row>
					<Grid.Column md={6}>
						<div className={styles.signIn__image}>
							<Image layout="fill" loader={loader} alt="sign in" src="/images/signin.jpg" />
						</div>
					</Grid.Column>
					<Grid.Column md={6}>
						<form onSubmit={processSignIn} className={styles.signIn__form}>
							<input className={styles.signIn__input} placeholder="username" name="username" type="text" />
							<input className={styles.signIn__input} placeholder="password" name="password" type="password" />
							<Link className={styles.signIn__link} href={'/signup'}>
								Sign up
							</Link>
							<Button size="medium" variant="primary" className={styles.signIn__btn} type="submit">
								Sign in
							</Button>
						</form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</section>
	);
};
export default SignIn;
