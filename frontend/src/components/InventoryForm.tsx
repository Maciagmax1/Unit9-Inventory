import { FormEvent, useState } from "react";
import Item from "../models/Item";
import "./InventoryForm.css";

interface Props {
  onAddItem: (item: Item) => void;
}

const InventoryForm = ({ onAddItem }: Props) => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onAddItem({
      product,
      price: parseInt(price),
      quantity: parseInt(quantity),
    });
    setProduct("");
    setPrice("");
    setQuantity("");
  };

  return (
    <form className="InventoryForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="product">Product</label>
      <input
        type="text"
        name="product"
        id="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        required
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        name="price"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label htmlFor="quantity">Quantity</label>
      <input
        type="text"
        name="quantity"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
};

export default InventoryForm;
