import Image from 'next/image';
import styles from './Photos.module.scss';
import loader from '../../utils/loader';
const Photos = (props) => {
	return (
		<section>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-1.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-2.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-3.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-4.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-5.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-6.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-7.jpg" />
						</div>
						<div className={styles.imageItem}>
							<Image alt="" loader={loader} layout="fill" className={styles.image} src="/images/photos/photo-8.jpg" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Photos;
