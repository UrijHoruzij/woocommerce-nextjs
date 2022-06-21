import Link from 'next/link';
import styles from './LatestPosts.module.css';

const LatestPosts = (props) => {
	const { posts } = props;
	return (
		<section className={styles.latest}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title">
							<span>Latest News</span>
							<h2>Fashion New Trends</h2>
						</div>
					</div>
				</div>
				<div className="row">
					{posts.map((post) => (
						<div key={post.id} className="col-lg-4 col-md-6 col-sm-6">
							<div className={styles.blogItem}>
								<div className={styles.blogItem} data-setbg="img/blog/blog-1.jpg"></div>
								<div className={styles.blogItemText}>
									<span className={styles.blogItemDate}>
										{/* <img src="/images/icon/calendar.png" alt=""> */}
										{post.date}
									</span>
									{/* 16 February 2020 */}
									<h5 className={styles.blogItemTitle}>{post.title.rendered}</h5>
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
