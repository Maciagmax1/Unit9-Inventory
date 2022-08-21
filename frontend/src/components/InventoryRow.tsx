import { Link } from "react-router-dom";
import Item from "../models/Item";
import "./InventoryRow.css";

interface Props {
  item: Item;
  index: number;
  onDelete: () => void;
}

const InventoryRow = ({ item, index, onDelete }: Props) => {
  return (
    <tr className="InventoryRow">
      <td>{index + 1}</td>
      <td>
        <Link to={`/details/${encodeURIComponent(item._id!)}`}>
          {item.product}
        </Link>
      </td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td onClick={() => onDelete()}>X</td>
    </tr>
  );
};

export default InventoryRow;
