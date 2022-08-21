import Item from "../models/Item";
import InventoryRow from "./InventoryRow";
import "./InventoryTable.css";

interface Props {
  inventory: Item[];
  onDelete: (id: string) => void;
}

const InventoryTable = ({ inventory, onDelete }: Props) => {
  return (
    <table className="InventoryTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item, index) => (
          <InventoryRow
            item={item}
            index={index}
            onDelete={() => onDelete(item._id!)}
            key={item._id}
          />
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
