import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchParams from "../models/SearchParams";
import "./FilterForm.css";

const FilterForm = () => {
  const [maxPrice, setMaxPrice] = useState("");
  const [product, setProduct] = useState("");
  const [pageSize, setPageSize] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const inquiry: SearchParams = {
      ...(maxPrice ? { "max-price": parseInt(maxPrice) } : {}),
      ...(product ? { product } : {}),
      ...(pageSize ? { "page-size": parseInt(pageSize) } : {}),
    };
    navigate(`/search?${new URLSearchParams(inquiry as any)}`);
  };

  return (
    <form className="FilterForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="maxPrice">Max Price</label>
      <input
        type="number"
        name="maxPrice"
        id="maxPrice"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <label htmlFor="product">Product</label>
      <input
        type="text"
        name="product"
        id="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <label htmlFor="pageSize">Page Size</label>
      <input
        type="number"
        name="pageSize"
        id="pageSize"
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}
      />
      <button>Filter</button>
    </form>
  );
};

export default FilterForm;
