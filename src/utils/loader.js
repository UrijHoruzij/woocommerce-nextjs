const imageLoader = ({ src }) => {
	// const remote = src.indexOf(process.env.NEXT_PUBLIC_WORDPRESS_URL);
	// if (remote === -1) return `/images/${src}`;
	return src;
};

export default imageLoader;
