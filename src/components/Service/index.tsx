import Image from 'next/image';
import loader from '../../utils/loader';
import styles from './Service.module.scss';
import { Grid } from 'ui-forest';

const Service = () => {
	return (
		<section className={styles.service}>
			<Grid>
				<Grid.Row>
					<Grid.Column lg={3} md={6}>
						<div className={styles.service__card}>
							<div className={styles.service__icon}>
								<Image
									unoptimized={true}
									loader={loader}
									width={44}
									height={44}
									src="/images/service/service-icon-1.png"
									alt="Service icon"
								/>
							</div>
							<div className={styles.service__content}>
								<p className={styles.service__title}>Free Shipping</p>
								<p className={styles.service__text}>On All Order Over $599</p>
							</div>
						</div>
					</Grid.Column>
					<Grid.Column lg={3} md={6}>
						<div className={styles.service__card}>
							<div className={styles.service__icon}>
								<Image
									unoptimized={true}
									width={44}
									height={44}
									loader={loader}
									src="/images/service/service-icon-2.png"
									alt="Service icon"
								/>
							</div>
							<div className={styles.service__content}>
								<p className={styles.service__title}>Easy Returns</p>
								<p className={styles.service__text}>30 Day Returns Policy</p>
							</div>
						</div>
					</Grid.Column>
					<Grid.Column lg={3} md={6}>
						<div className={styles.service__card}>
							<div className={styles.service__icon}>
								<Image
									unoptimized={true}
									width={44}
									height={44}
									loader={loader}
									src="/images/service/service-icon-3.png"
									alt="Service icon"
								/>
							</div>
							<div className={styles.service__content}>
								<p className={styles.service__title}>Secure Payment</p>
								<p className={styles.service__text}>100% Secure Gaurantee</p>
							</div>
						</div>
					</Grid.Column>
					<Grid.Column lg={3} md={6}>
						<div className={styles.service__card}>
							<div className={styles.service__tcon}>
								<Image
									unoptimized={true}
									width={44}
									height={44}
									loader={loader}
									src="/images/service/service-icon-4.png"
									alt="Service icon"
								/>
							</div>
							<div className={styles.service__content}>
								<p className={styles.service__title}>Special Support</p>
								<p className={styles.service__text}>24/7 Dedicated Support</p>
							</div>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>

			<div className="container">
				<div className="row"></div>
			</div>
		</section>
	);
};
export default Service;
