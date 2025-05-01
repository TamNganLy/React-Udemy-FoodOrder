import Button from "./Button";
import {CartContext} from "../store/cart-context.jsx";
import { useContext } from "react";

export default function Meal({meal:{ id, name, price, description, image }}) {
  const {addItemToCart} = useContext(CartContext);

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button text="Add to Cart" Onclick={() => addItemToCart({ id, name, price })}/>
        </p>       
      </article>
    </li>
  );
}
