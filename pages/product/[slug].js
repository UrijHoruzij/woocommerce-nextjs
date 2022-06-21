import axios from 'axios';
import Image from 'next/image';
import { Layout } from '../../src/components';
import woocommerce from '../../src/utils/woocommerce';
import { SITE_INFO, MENU, LOGO } from '../../src/utils/endpoints';
import loader from '../../src/utils/loader';

const Product = (props) => {
	const { title, description, menu, product, logo } = props;
	return (
		<Layout logo={logo} menu={menu} title={title} description={description}>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						{product.images.map((image) => (
							<Image loader={loader} key={image.id} width={250} height={250} src={image.src} alt={image.alt} />
						))}
					</div>
					<div className="col-md-6">
						<h3 className="">{product.name}</h3>
						{product.price}
						{product.description}

						{product.categories.map((category) => (
							<p key={category.id}>{category.name}</p>
						))}
						{product.attributes.map((attribute) => (
							<div key={attribute.id}>
								<p>{attribute.name}</p>
								<select>
									{attribute.options.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Product;

export async function getStaticProps(context) {
	const {
		params: { slug },
	} = context;
	const logo = await axios.get(LOGO);
	const menu = await axios.get(MENU);
	const info = await axios.get(SITE_INFO);
	const product = await woocommerce.get('products', { slug: slug });
	// console.log(product);
	return {
		props: {
			logo: logo.data,
			menu: menu.data,
			title: info.data.name,
			description: info.data.description,
			product: product.data[0],
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const products = await woocommerce.get(`products`);
	const pathsData = [];
	products.data.map((product) => {
		pathsData.push({ params: { slug: product.slug } });
	});
	return {
		paths: pathsData,
		fallback: false,
	};
}
