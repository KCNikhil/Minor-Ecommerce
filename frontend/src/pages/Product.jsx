import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [productData, setProductData] = useState(null); // Store product details
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [image, setImage] = useState(""); // Store currently displayed image
  const [size, setSize] = useState(""); // Store selected size

  // Fetch product details from the backend API
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your actual API endpoint
        const response = await fetch(`http://127.0.0.1:8000/product/api/products/2`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json(); // Parse the API response
        setProductData(data); // Set product details
        setImage(data.image[0]); // Set the default image
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProductData();
  }, [productId]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productData) return <div>Product not found.</div>;

  // Destructure product details
  const { name, image: images, price, description, sizes = [] } = productData;

  return (
    <div className="border-t-2 pt-10">
      {/* Product Details */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Main Product Image */}
        <div>
          <img className="w-full max-w-[500px]" src={image} alt={name} />
          {/* Thumbnail Images */}
          <div className="flex gap-2 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-16 h-16 cursor-pointer"
                alt={`Thumbnail ${index}`}
                onClick={() => setImage(img)} // Change main image on click
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-xl mt-4">${price}</p>
          <p className="text-gray-600 mt-4">{description}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <h3>Select Size:</h3>
            <div className="flex gap-2">
              {sizes.length > 0 ? (
                sizes.map((s) => (
                  <button
                    key={s}
                    className={`px-4 py-2 border ${size === s ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="bg-black text-white px-6 py-3 mt-6"
            onClick={() => console.log(`Added to cart: ${productId}, Size: ${size}`)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
