import Link from 'next/link';
import Image from 'next/image';
import styles from './LatestPosts.module.scss';
import { formatDate } from '../../utils/date';
import loader from '../../utils/loader';

const LatestPosts = (props) => {
	const { posts } = props;
	return (
		<section className={styles.blog}>
			<div className="container">
				<h2 className={styles.sectionTitle}>Latest fashion news</h2>
				<div className="row">
					{posts.map((post) => (
						<div key={post.id} className="col-md-4">
							<div className={styles.card}>
								<div className={styles.card__image}>
									<Link href={`/blog/${post.slug}`}>
										<a>
											<Image
												loader={loader}
												src="/images/blog-1.jpg"
												alt={post.title.rendered}
												layout="fill"
												unoptimized={true}
											/>
										</a>
									</Link>
								</div>
								<div className={styles.card__meta}>
									<Link href={`/category/${post.slug}`}>
										<a className={styles.card__category}>Fashion</a>
									</Link>
									<time className={styles.card__time} dateTime="2021-03-31">
										{formatDate(post.date)}
									</time>
								</div>
								<Link href={`/blog/${post.slug}`}>
									<a>
										<h3 className={styles.card__title}>{post.title.rendered}</h3>
									</a>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default LatestPosts;
