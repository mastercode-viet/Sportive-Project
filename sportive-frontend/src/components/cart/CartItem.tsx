type CartItemProps = {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
  onRemove?: (id: string) => void;
};

const CartItem = ({ item, onRemove }: CartItemProps) => (
  <div className="flex items-center gap-4 border-b py-3">
    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
    <div className="flex-1">
      <div className="font-semibold">{item.name}</div>
      <div className="text-gray-500 text-sm">{item.price.toLocaleString()}₫ x {item.quantity}</div>
    </div>
    {onRemove && (
      <button onClick={() => onRemove(item.id)} className="text-red-500 text-xs">Xoá</button>
    )}
  </div>
);

export default CartItem;
