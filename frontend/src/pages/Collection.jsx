import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilterAndSort = () => {
    let filteredProducts = [...products];

    // Filter based on search term
    if (search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter based on selected categories
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) => category.includes(item.category));
    }

    // Filter based on selected sub-categories
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) => subCategory.includes(item.subCategory));
    }

    // Sort products
    switch (sortType) {
      case 'low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    setFilterProducts(products); // Show all products initially
  }, [products]);

  useEffect(() => {
    applyFilterAndSort(); // Apply filter and sort whenever the filters change
  }, [category, subCategory, search, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p>CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((categoryName) => (
              <p key={categoryName} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={categoryName}
                  onChange={toggleCategory}
                  checked={category.includes(categoryName)}
                />
                {categoryName}
              </p>
            ))}
          </div>
        </div>

        {/* Sub-category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <p key={type} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={type}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(type)}
                />
                {type}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
