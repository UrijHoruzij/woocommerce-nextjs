import { useState } from 'react';
import axios from 'axios';
import { NEWSLETTER } from '../../utils/endpoints';
import styles from './Newsletter.module.scss';
const Newsletter = (props) => {
	const [success, setSuccess] = useState(false);
	const processSubscribe = async (e) => {
		e.preventDefault();
		axios.post(NEWSLETTER, { email: e.target.email.value });
	};
	return (
		<section className={styles.newsletter}>
			<div className="container">
				<div className={styles.newsletter__card}>
					<h2 className={styles.newsletter__title}>Subscribe Newsletter</h2>
					<p className={styles.newsletter__text}>
						Enter your email below to be the first to know about new collections and product launches.
					</p>
					<form onSubmit={processSubscribe} className={styles.newsletter__form}>
						<div className={styles.newsletter__inputWrapper}>
							{/* <ion-icon name="mail-outline"></ion-icon> */}
							<input
								type="email"
								name="email"
								placeholder="Enter your email"
								required
								className={styles.newsletter__input}
							/>
						</div>
						<button type="submit" className={styles.newsletter__btn}>
							<span>Subscribe</span>
							{/* <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon> */}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};
export default Newsletter;
