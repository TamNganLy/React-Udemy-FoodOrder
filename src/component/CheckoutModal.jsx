import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
  useActionState,
} from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context.jsx";
import Button from "./Button.jsx";

const CheckoutModal = forwardRef(function Modal({ ...props }, ref) {
  const [formState, formAction] = useActionState(checkout, {
    errors: null,
  });

  const dialog = useRef();
  const { items } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  async function checkout(prevFormState, formData) {
    const fullName = formData.get("full-name");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalcode = formData.get("postal-code");
    const city = formData.get("city");
  
    let errors = [];
  
    if (fullName.trim() === "") {
      errors.push("Please provide your full name.");
    }
  
    if (!email.includes("@")) {
      errors.push("Invalid email address.");
    }
  
    if (street.trim() === "") {
      errors.push("Please provide your treet.");
    }
  
    if (postalcode.trim() === "") {
      errors.push("Please provide your postal code.");
    }
  
    if (city.trim() === "") {
      errors.push("Please provide your city.");
    }
  
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          fullName,
          email,
          street,
          postalcode,
          city,
        },
      };
    }
  
    async function updateOrder(order) {
      const response = await fetch("http://localhost:3000/orders", {
        method: 'POST',
        body: JSON.stringify({order}),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const resDate = await response.json();
  
      if (!response.ok) {
        throw new Error("Failed to update order.");
      }
  
      return resDate.message;
    }

    const order = {
      items: items,
      customer: {
        email,
        name: fullName,
        street,
        ['postal-code']: postalcode,
        city
      }
    };
  
    await updateOrder(order);
  
    return { errors: null };
  }

  function handleClose() {
    dialog.current.close();
  }

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>Checkout</h2>
      <span>Total Amount: {formattedTotalPrice}</span>

      <form action={formAction}>
        <div>
          <div className="control">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              defaultValue={formState.enteredValues?.fullName}
            />
          </div>

          <div className="control">
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={formState.enteredValues?.email}
            />
          </div>

          <div className="control">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              defaultValue={formState.enteredValues?.street}
            />
          </div>

          <div className="control-row">
            <div className="control">
              <label htmlFor="postal-code">Postal Code</label>
              <input
                type="text"
                id="postal-code"
                name="postal-code"
                defaultValue={formState.enteredValues?.postalcode}
              />
            </div>

            <div className="control">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={formState.enteredValues?.city}
              />
            </div>
          </div>
        </div>

        {formState.errors && (
          <ul>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div className="modal-actions">
          <button className="text-button" type="reset" onClick={handleClose}>
            Close
          </button>
          <Button text="Submit Order"/>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CheckoutModal;
