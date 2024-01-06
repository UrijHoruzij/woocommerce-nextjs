import React from 'react';
import styles from './Hero.module.scss';
import { Grid } from 'ui-forest';

const Hero = () => {
	return (
		<section className={styles.hero}>
			<Grid>
				<p className={styles.heroSubtitle}>Fashion Everyday</p>
				<h2 className={styles.heroTitle}>Unrivalled Fashion House</h2>
				<button className={styles.heroBtn}>Shop Now</button>
			</Grid>
		</section>
	);
};
export default Hero;
