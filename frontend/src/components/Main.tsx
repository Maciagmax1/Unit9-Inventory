import { useEffect, useState } from "react";
import {
  addInventoryItem,
  deleteById,
  getInventoryItems,
} from "../services/inventoryService";
import { useSearchParams } from "react-router-dom";
import SearchParams from "../models/SearchParams";
import "./Main.css";
import Item from "../models/Item";
import FilterForm from "./FilterForm";
import InventoryTable from "./InventoryTable";
import InventoryForm from "./InventoryForm";

const Main = () => {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [searchParams] = useSearchParams();
  const maxPrice: string | null = searchParams.get("max-price");
  const product: string | null = searchParams.get("product");
  const pageSize: string | null = searchParams.get("page-size");

  const getAndSetInventory = (
    maxPrice: string | null,
    product: string | null,
    pageSize: string | null
  ): void => {
    const inquiryParams: SearchParams = {
      ...(maxPrice ? { "max-price": parseInt(maxPrice) } : {}),
      ...(product ? { product } : {}),
      ...(pageSize ? { "page-size": parseInt(pageSize) } : {}),
    };
    getInventoryItems(inquiryParams).then((response) => {
      setInventory(response);
    });
  };

  const deleteItem = (id: string): void => {
    deleteById(id).then(() => {
      getAndSetInventory(maxPrice, product, pageSize);
    });
  };

  const addItem = (item: Item): void => {
    addInventoryItem(item).then(() => {
      getAndSetInventory(maxPrice, product, pageSize);
    });
  };

  useEffect(() => {
    getAndSetInventory(maxPrice, product, pageSize);
  }, [maxPrice, product, pageSize]);

  return (
    <div className="Main">
      <FilterForm />
      <InventoryForm onAddItem={addItem} />
      <InventoryTable inventory={inventory} onDelete={deleteItem} />
    </div>
  );
};

export default Main;
