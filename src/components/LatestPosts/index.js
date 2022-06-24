import Link from 'next/link';
import Image from 'next/image';
import styles from './LatestPosts.module.scss';
import { formatDate } from '../../utils/date';
import loader from '../../utils/loader';

const LatestPosts = (props) => {
	const { posts } = props;
	return (
		<section className={styles.latest}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<h2 className={styles.titleSection}>Fashion New Trends</h2>
					</div>
				</div>
				<div className="row">
					{posts.map((post) => (
						<div key={post.id} className="col-lg-4 col-md-6 col-sm-6">
							<div className={styles.blogItem}>
								<div className={styles.blogItemImage}>
									<Image className={styles.image} loader={loader} src="/images/blog/blog-1.jpg" alt="" layout="fill" />
								</div>
								<div className={styles.blogItemText}>
									<div className={styles.blogItemDate}>
										<div className={styles.blogItemDateImage}>
											<Image
												className={styles.image}
												loader={loader}
												src="/images/icon/calendar.png"
												alt=""
												layout="fill"
											/>
										</div>
										{formatDate(post.date)}
									</div>
									<h4 className={styles.blogItemTitle}>{post.title.rendered}</h4>
									<Link href={`/blog/${post.slug}`}>
										<a className={styles.blogItemLink}>Read More</a>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default LatestPosts;
