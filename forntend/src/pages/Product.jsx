import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
	const { productId } = useParams();
	const { products, currency } = useContext(ShopContext);
	const [productData, setProductData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [size, setSize] = useState("");
	const [image, setImage] = useState("");

	// Fetch product data based on productId
	useEffect(() => {
		setLoading(true);
		if (products?.length > 0) {
			const product = products.find((item) => item._id === productId);
			if (product) {
				setProductData(product);
				setImage(product.image[0]); // Default image
			}
		}
		setLoading(false);
	}, [productId, products]);

	if (loading) return <div>Loading...</div>;

	if (!productData) return <div>Product not found.</div>;

	const {
		name,
		image: images,
		rating,
		ratingCount = 0,
		price,
		description,
		sizes = [],
	} = productData;

	return (
		<div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
			{/* Product Details */}
			<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
				{/* Product Image Preview */}
				<div className="w-full sm:w-auto">
					<img
						className="w-full h-auto max-w-[500px] mx-auto"
						src={image}
						alt="Selected Product"
					/>
				</div>

				{/* Thumbnail Images */}
				<div className="flex sm:flex-col-reverse gap-3 sm:flex-row">
					<div className="flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[25%] w-full">
						{images.map((item, index) => (
							<img
								key={index}
								src={item}
								className={`w-full sm:w-auto sm:mb-3 flex-shrink-0 cursor-pointer`}
								alt={`product-image-${index}`}
								onClick={() => setImage(item)}
							/>
						))}
					</div>
				</div>

				{/* Product Information */}
				<div className="flex-1 mt-6">
					<h1 className="font-medium text-2xl mt-2">{name}</h1>
					<div className="flex items-center gap-1 mt-2">
						{[...Array(5)].map((_, index) => (
							<img
								key={index}
								src={index < rating ? assets.star_icon : assets.star_dull_icon}
								alt="star-icon"
								className="w-3.5"
							/>
						))}
						<p className="pl-2">({ratingCount})</p>
					</div>
					<p className="mt-5 text-3xl font-medium">
						{currency}
						{price}
					</p>
					<p className="mt-5 text-gray-500 md:w-4/5">{description}</p>

					{/* Size Selection */}
					<div className="flex flex-col gap-4 my-8">
						<p>Select Size</p>
						<div className="flex gap-2">
							{sizes.length > 0 ? (
								sizes.map((item, index) => (
									<button
										key={index}
										onClick={() => setSize(item)}
										className={`border py-2 px-4 bg-gray-100 ${
											item === size ? "border-orange-500" : ""
										}`}
									>
										{item}
									</button>
								))
							) : (
								<p className="text-gray-500">No sizes available</p>
							)}
						</div>
						<button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ">
							ADD TO CART
						</button>
						<hr className="mt-8 sm:w-4/5" />
						<div className="text-sm text-gray-500 mt-5 flex flex-col gap 1">
							<p>100% Original Product.</p>
							<p>Cash on delivery is available on this product.</p>
							<p>Easy return and exchange policy within 7 days.</p>
						</div>
					</div>
				</div>
			</div>
			{/* Description and Review Section */}
			<div className="mt-20">
				<div className="flex">
					<b className="border px-5 py-3 text-sm">Description</b>
					<p className="border px-5 py-3 text-sm">Reviews (122)</p>
				</div>
				<div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
					<p>An e-commerce website is very good; loved the purchases.</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nostrum vitae aliquid aspernatur eum natus distinctio! Autem ipsam laboriosam at dolorum ea excepturi enim aliquam culpa nobis, earum suscipit ipsa?</p>
				</div>
			</div>
      {/* display related products */}
      <RelatedProducts catogery={productData.catogery} subCatogery={productData.subCatogery}/>

		</div>
	);
};

export default Product;
