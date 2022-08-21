import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Item from "../models/Item";
import { getItemById } from "../services/inventoryService";
import "./Details.css";

const Details = () => {
  const id: string | undefined = useParams().id;
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    getItemById(id!).then((response) => {
      setItem(response);
    });
  }, [id]);

  return (
    <div className="Details">
      {item ? (
        <div>
          <p>{item.product}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
        </div>
      ) : (
        <div>
          <p>No Item With that ID</p>
          <Link to="/">Home</Link>
        </div>
      )}
    </div>
  );
};

export default Details;
