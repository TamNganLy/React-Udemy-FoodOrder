import { CartContext } from "../store/cart-context.jsx";
import { useContext } from "react";

export default function Cart() {
  const { items, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div className="cart">
      {items.length === 0 && <p>No items in cart</p>}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item) => {
              return (
                <li key={item.id} className="cart-item">
                  <p>
                    {item.name} - {item.quantity} x ${item.price}
                  </p>
                  <div className="cart-item-actions">
                    <button onClick={() => removeItemFromCart(item)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => addItemToCart(item)}>+</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="cart-total">{formattedTotalPrice}</p>
        </>
      )}
    </div>
  );
}
