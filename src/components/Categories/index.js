import Image from 'next/image';
import Link from 'next/link';
import styles from './Categories.module.scss';
import loader from '../../utils/loader';

const Categories = (props) => {
	const { categories } = props;
	// return(
	// 	<section class="category">
	//     <div class="container">
	// 	<div className="row">
	// 		<div className="col-md-6">
	// 			<figure className="category-banner">
	//             <Image src="./assets/images/category-1.jpg" alt="Sunglass & eye" loading="lazy" width="510" height="600"
	//               class="w-100">
	//           </figure>
	//           <a href="#" className="btn btn-secondary">Sunglass & Eye</a>
	// 		</div>
	// 		<div className="col-md-6">
	// 			 <li class="category-item">
	//           <figure class="category-banner">
	//             <Image src="./assets/images/category-2.jpg" alt="Active & outdoor" loading="lazy" width="510" height="600"
	//               class="w-100">
	//           </figure>

	//           <a href="#" class="btn btn-secondary">Active & Outdoor</a>
	//         </li>
	// 		</div>
	// 	</div>
	// 	<div className="row">
	// 		<div className="col-lg-3 col-md-6">
	// 			<figure class="category-banner">
	//             <Image src="./assets/images/category-3.jpg" alt="Winter wear" loading="lazy" width="510" height="600"
	//               class="w-100">
	//           </figure>

	//           <a href="#" class="btn btn-secondary">Winter Wear</a>
	// 		</div>
	// 		<div className="col-lg-3 col-md-6">
	// 			<figure class="category-banner">
	//             <Image src="./assets/images/category-4.jpg" alt="Exclusive footwear" loading="lazy" width="510"
	//               height="600" class="w-100">
	//           </figure>

	//           <a href="#" class="btn btn-secondary">Exclusive Footwear</a>
	// 		</div>
	// 		<div className="col-lg-3 col-md-6">
	// 			 <figure class="category-banner">
	//             <Image src="./assets/images/category-5.jpg" alt="Jewelry" loading="lazy" width="510" height="600"
	//               class="w-100">
	//           </figure>
	//           <a href="#" class="btn btn-secondary">Jewelry</a>
	// 		</div>
	// 		<div className="col-lg-3 col-md-6">
	// 			 <figure class="category-banner">
	//             <Image src="./assets/images/category-6.jpg" alt="Sports cap" loading="lazy" width="510" height="600"
	//               class="w-100">
	//           </figure>
	// 		  <Link href={`/category/${category.slug}`}>
	//           <a href="#" class="btn btn-secondary">Sports Cap</a>

	// 		  </Link>
	// 		</div>
	// 	</div>
	//     </div>
	//   </section>
	// )
	return (
		<section className={styles.categories}>
			<div className="container">
				<div className="row">
					{categories.map((category) => (
						<div key={category.id} className="col-md-4">
							<div className={styles.categories__card}>
								<div className={styles.categories__image}>
									{category.image ? (
										<Image loader={loader} layout="fill" src={category.image.src} alt={category.name} />
									) : null}
								</div>
								<div className={styles.categories__content}>
									<Link href={`/category/${category.slug}`}>
										<a className={styles.categories__link}>{category.name}</a>
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
export default Categories;
