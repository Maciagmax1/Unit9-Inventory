import axios from "axios";
import Item from "../models/Item";
import SearchParams from "../models/SearchParams";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getInventoryItems = async (
  searchParams: SearchParams
): Promise<Item[]> =>
  (
    await axios.get(baseURL, {
      params: searchParams,
    })
  ).data;

export const deleteById = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
};

export const addInventoryItem = async (item: Item): Promise<Item> => {
  return (await axios.post(baseURL, item)).data;
};

export const getItemById = async (id: string): Promise<Item> => {
  return (await axios.get(`${baseURL}/${encodeURIComponent(id)}`)).data;
};
