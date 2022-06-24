import Link from 'next/link';
import styles from './Hero.module.scss';

const Hero = (props) => {
	return (
		<section className={styles.hero}>
			<div className="container">
				<div className="row">
					<div className="col-xl-5 col-lg-7 col-md-8">
						<div className={styles.heroText}>
							<h6>Summer Collection</h6>
							<h2>Fall - Winter Collections 2030</h2>
							<p>
								A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to
								exceptional quality.
							</p>
							<Link href={'/shop'}>
								<a className={styles.primaryBtn}>
									Shop now <span className="arrow_right"></span>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Hero;
