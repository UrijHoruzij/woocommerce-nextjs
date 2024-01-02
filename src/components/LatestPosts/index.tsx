import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LatestPosts.module.scss';
import { formatDate } from '../../utils/date';
import loader from '../../utils/loader';
import { Grid } from 'ui-forest';

interface LatestPostsProps {
	posts: any;
}

const LatestPosts: FC<LatestPostsProps> = (props) => {
	const { posts } = props;
	return (
		<section className={styles.blog}>
			<Grid>
				<h2 className={styles.sectionTitle}>Latest fashion news</h2>
				<Grid.Row>
					{posts.map((post: any) => (
						<Grid.Column key={post.id} md={4}>
							<div className={styles.card}>
								<div className={styles.card__image}>
									<Link href={`/blog/${post.slug}`}>
										<Image
											loader={loader}
											src="/images/blog-1.jpg"
											alt={post.title.rendered}
											layout="fill"
											unoptimized={true}
										/>
									</Link>
								</div>
								<div className={styles.card__meta}>
									<Link className={styles.card__category} href={`/category/${post.slug}`}>
										Fashion
									</Link>
									<time className={styles.card__time} dateTime="2021-03-31">
										{formatDate(post.date)}
									</time>
								</div>
								<Link href={`/blog/${post.slug}`}>
									<h3 className={styles.card__title}>{post.title.rendered}</h3>
								</Link>
							</div>
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</section>
	);
};
export default LatestPosts;
