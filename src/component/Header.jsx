import logo from "../assets/logo.jpg";
import {CartContext} from "../store/cart-context.jsx";
import { useContext, useRef } from "react";
import CartModal from "./CartModal.jsx";
import Button from "./Button.jsx";
import CheckoutModal from "./CheckoutModal.jsx";

export default function Header() {
  const modal = useRef();
  const checkoutModal = useRef();
  const {items} = useContext(CartContext);

  const cartQuantity = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  function handleOpenCartClick() {
    modal.current.open();
  }

  function handleOpenCheckoutClick() {
    checkoutModal.current.open();
  }

  let modalActions = <button className="text-button">Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="text-button">Close</button>
        <Button onClick={handleOpenCheckoutClick} text="Go to Checkout"/>
      </>
    )
  }

  return (
    <>
      <CartModal ref={modal} actions={modalActions}/>
      <CheckoutModal ref={checkoutModal}/>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>REACTFOOD</h1>
        </div>
        <button className="text-button" onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
      </header>
    </>
  );
}
